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
              .then(response => {
                res.status(200).send(userData)
              })
              .catch(error => {
                this.sendError(res, 500, error)
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
              .then(response => {
                res.status(200).send()
              })
              .catch(error => {
                this.sendError(res, 500, error)
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