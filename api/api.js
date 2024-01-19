const axios = require('axios')
const cdn = require("./cdn.js")

const sendError = (res, code, msg) => {
  res.status(code)
  res.send({"error":msg})
}

const sendOTP = async ({ body }, res, db) => {
  var { phone, email, id } = { body }
  
  axios.post('https://otp.iskconmysore.org/data', {
    id, email, phone
  }, {
    headers: {
      'endpoint': '/send',
      'Content-Type': 'application/json'
    }
  })
  .then(() => {
    res.status(200).end()
  })
  .catch(error => {
    sendError(res, error.response.status, error)
  })
}

const verifyOTP = async ({ body }, res, db) => {
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
    sendError(res, error.response.status, error)
  })
}

const setUserPhoto = async ({body}, res, db) => {
  const { filename, imageDataURL } = body
  const base64Data = imageDataURL.split(';base64,').pop()
  const binaryBuffer = Buffer.from(base64Data, 'base64');

  cdn.put(filename, binaryBuffer).then(()=>{
    res.send()
  }).catch(err => {
    sendError(res, 500, `Could not set user photo: ${err}`)
  })
}

const endpoints = {
  "/send-otp": sendOTP,
  "/verify-otp": verifyOTP,
  "/set-user-photo": setUserPhoto
}

class API {
    constructor(db){
        this.db = db
    }

    async call(req, res) {
        var endpoint = req.get("endpoint")
        console.log(`api - ${endpoint}`)
        if(endpoint in endpoints){
          endpoints[endpoint](req, res, this.db)
        }else{
          sendError(res, 400, `Endpoint ${endpoint} not found`)
        }
    }
}

module.exports = API