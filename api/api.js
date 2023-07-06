var cred = require("./cred.js")
const sync = require("./sync.js")
const axios = require('axios')

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
            const { phone, email, id } = body
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
              .then(response => {
                res.status(200).send(userData)
              })
              .catch(error => {
                this.sendError(res, 500, error)
              })
            break

            case '/buddies':

            const username = req.get("username")

            try {
              let query = `SELECT * FROM roles WHERE username = '${username}' order by roleIndex limit 1`
              let result = await this.db.execQuery(query)
          
              if (result.length > 0) {

                  var role = result[0]
                  switch(role.roleID){
                    case "FG":
                      query=`select * from participants
                      join compute on compute.username=participants.username
                      order by compute.activeness`
                      break
                    case "Core":
                      query=`select * from participants
                      join compute on compute.username=participants.username
                      where participants.buddy="${username}"
                      order by compute.activeness`
                      break
                    default:
                      this.sendError(res, 404, "Unauthorized")
                      return
                  }

                  let buddies = await this.db.execQuery(query)
                  res.status(200).json(buddies)
              } else {
                this.sendError(res, 404, "Unauthorized")
                return
              }
            } catch (error) {
              // Handle any error that occurred during the database query or other operations
              console.error("Login error:", error)
              this.sendError(res, 500, `Internal server error: ${error}`)
            }
            break

          case "/sync":
            sync.getSyncData()
            .then(async resp => {
              var queries = sync.getQueries(resp.data)
              var errors = []

              console.log(new Date(), `Sync began`)

              for(var i=0; i<queries.length; i++){
                try {
                  await this.db.execQuery(queries[i])
                } catch(e){
                  errors.push({
                    query: queries[i],
                    error: e
                  })
                }
              }
              console.log(new Date(), `Sync completed`)
              res.status(200).json(errors)
            })
            .catch(error => {
              this.sendError(res, 404, error)
            })
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