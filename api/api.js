const otp = require("./otp.js")
const cdn = require("./cdn.js")

const sendError = (res, code, msg) => {
  res.status(code)
  res.send(msg)
}

const verifyUser = async ({ body }, res, db) => {
  const { id } = body
  db.query(`
    SELECT users.id, users.name, roles.id as roleID, roles.name as roleName, roles.index as roleIndex
      FROM (
          SELECT id, name, phone, email, "volunteer" as roleID FROM volunteers
          UNION
          SELECT id, name, phone, email, roleID FROM approles
      ) AS users
    JOIN roles ON users.roleID=roles.id
    WHERE phone = '${id}' or email = '${id}';`
  ).then(result=>{
    if(result){
      if(result.length){
        res.status(200)
        res.send(result)
      }else{
        sendError(res, 404, "User not found")
      }
    }else{
      sendError(res, 500, "Unknown error while verifying user. Got undefined or null result")
    }
  })
}

const sendOTP = async ({ body }, res) => {
  otp.send(body)
  .then(() => {
    res.status(200).end()
  })
  .catch(error => {
    console.log(error)
    sendError(res, 500, error)
  })
}

const verifyOTP = async ({ body }, res) => {
  otp.verify(body)
  .then(status => {
    res.status(status).end()
  })
  .catch(error => {
    sendError(res, 500, error)
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
  "/verify-user": verifyUser,
  "/send-otp": sendOTP,
  "/verify-otp": verifyOTP,
  "/set-user-photo": setUserPhoto,
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