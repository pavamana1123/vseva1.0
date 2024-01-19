import { put } from "./cdn.js"
import { send, verify } from "./otp.js"

const sendError = (res, code, msg) => {
  res.status(code)
  res.send({"error":msg})
}

const sendOTP = async ({ body }, res) => {
  otp.send(body)
  .then(() => {
    res.status(200).end()
  })
  .catch(error => {
    sendError(res, error.response.status, error)
  })
}

const verifyOTP = async ({ body }, res) => {
  otp.verify(body)
  .then(() => {
    res.status(200).end()
  })
  .catch(error => {
    sendError(res, error.response.status, error)
  })
}

const setUserPhoto = async ({body}, res, db) => {
  const { filename, imageDataURL } = body
  const base64Data = imageDataURL.split(';base64,').pop()
  const binaryBuffer = Buffer.from(base64Data, 'base64');

  put(filename, binaryBuffer).then(()=>{
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

export default API