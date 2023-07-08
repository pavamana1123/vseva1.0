var cred = require("./cred.js")
const sync = require("./sync.js")
const axios = require('axios')
const axios = require('natural')

function getNextUsername(str) {
  const matches = str.match(/(\d+)$/);
  if (matches && matches.length > 0) {
    const num = parseInt(matches[0]);
    const nextNum = num + 1;
    return str.replace(/(\d+)$/, nextNum.toString());
  } else {
    return str + "1";
  }
}

function closestName(input, array) {
  let closestMatch;
  let closestDistance = Infinity;

  for (let i = 0; i < array.length; i++) {
    const currentDistance = natural.JaroWinklerDistance(input, array[i]);
    if (currentDistance < closestDistance) {
      closestDistance = currentDistance;
      closestMatch = array[i];
    }
  }

  return closestMatch;
}

class API {
    constructor(db){
        this.db = db
    }

    async call(req, res) {

        var {body} = req
        var self = this
        console.log(`api - ${req.get("endpoint")}`)
        
        switch(req.get("endpoint")){

          case '/send-otp':
            var { phone, email, id } = body
            var userData
            try {
              var ftmData = await this.db.execQuery(`select * from ftms where ${phone?'phone':'email'}='${phone?phone:email}';`)
              if(ftmData.length){
                userData = {users: ftmData, role: "FTM"}
              }else{
                var volunteerData = await this.db.execQuery(`select * from volunteers where ${phone?'phone':'email'}='${phone?phone:email}';`)
                if(volunteerData.length){
                  userData = {users: volunteerData, role: "Volunteer"}
                }else{
                  this.sendError(res, 404, new Error("User not found"))
                  return
                }
              }
            }catch(e){
              this.sendError(res, 500, e)
            }
            
            axios.post('https://otp.iskconmysore.org/data', {
              id, email, phone
            }, {
              headers: {
                'endpoint': '/send',
                'Content-Type': 'application/json'
              }
            })
              .then(() => {
                res.status(200).send(userData)
              })
              .catch(error => {
                this.sendError(res, error.response.status, error)
              })
            break

          case '/verify-otp':
            var { otp , id } = body
            
            axios.post('https://otp.iskconmysore.org/data', {
              id, otp
            }, {
              headers: {
                'endpoint': '/verify',
                'Content-Type': 'application/json'
              }
            })
              .then(() => {
                res.status(200).send()
              })
              .catch(error => {
                this.sendError(res, error.response.status, error)
              })
            break

            case "/get-event-details":
              var { id } = body
              id = id.trim()

              try {
                var group = await this.db.execQuery(`select * from eventgroups where groupId='${id}';`)
                if(group.length){
                  var events = await this.db.execQuery(`select * from events where groupId='${group[0].groupId}';`)
                  res.status(200).send(
                    {
                      isGroup: true,
                      group: group[0],
                      events,
                      dates: await this.db.execQuery(`select * from dates where ${events.map(e=>{
                        return `eventId='${e.id}'`
                      }).join(' or ')} order by date;`)
                    }
                  )
                }else{
                  var events = await this.db.execQuery(`select * from events where id='${id}';`)
                  if(events.length){
                    res.status(200).send(
                      {
                        isGroup: false,
                        events: events[0],
                        dates: await this.db.execQuery(`select * from dates where eventId='${events[0].id}' order by date;`)
                      }
                    )
                  }else{
                    this.sendError(res, 404, new Error(`Event ${id} does not exist`))
                  }
                }
              } catch(err){
                this.sendError(res, 500, err)
              }


              break

            case "/submit-availability":

              var { id, isGroup, name, phone, email, dob, gender, japaRounds, category ,preacher, availability } = body

              var username

              try {
                var volunteer = await this.db.execQuery(`select * from volunteers where phone='${phone}'`)
                if(volunteer.length){
                  var matchingName = closestName(name, volunteer.map(v=>{ return v.name }))
                  var matchingVolunteer = volunteer.filter(v=>{ return v.name==matchingName })[0]
                  username = matchingVolunteer.username
                  await this.db.execQuery(`UPDATE volunteers
                    SET
                      name = '${name}',
                      dob = '${dob}',
                      ${email?`email = '${email}'`:""}
                      gender = '${gender}',
                      japaRounds = ${japaRounds},
                      category = '${category}',
                      preacher = '${preacher}'
                    WHERE username = '${username}';
                  `)
                }else{
                  username = name.replace(/\s/g, '').toLowerCase()
                  volunteer = await this.db.execQuery(`select * from volunteers where username='${username}'`)
                  if(volunteer.length){
                    username = getNextUsername(username)
                  }
                  this.db.execQuery(`INSERT INTO volunteers
                    (
                      username,
                      name,
                      phone,
                      dob,
                      email,
                      gender,
                      japaRounds,
                      category,
                      preacher
                    )
                    VALUES
                    (
                      '${username}',
                      '${name}',
                      '${phone}',
                      '${dob}',
                      '${email}',
                      '${gender}',
                      ${japaRounds},
                      '${category}',
                      '${preacher}'
                    );
                  `)
                  
                }

                Object.keys(availability).forEach(key=>{
                  var idDatePair = key
                  var eventId = idDatePair.split(":")[0]
                  var date = idDatePair.split(":")[1]

                  this.db.execQuery(`INSERT INTO availability (eventId, date, username, availability)
                    VALUES ('${eventId}', '${date}', '${username}', '${availability}')
                  ON DUPLICATE KEY UPDATE
                    availability = VALUES(availability);`)
                })

                res.status(200).send()

              }catch(err){
                this.sendError(res, 500, err)
              }
              break

            default:
                this.sendError(res, 404, "Invalid endpoint")
        }
    }

    apiRequest(url, body, method, headers, callback, errcallback){
        fetch(url, {
            method: method || 'POST',
            headers: headers || {
                'content-type': 'text/json',
            },
            body
        })
        .then(res => res.json())
        .then(callback)
        .catch(errcallback)
    }

    sendError(res, code, msg){
        res.status(code)
        res.send({"error":msg})
    }
}

module.exports = API