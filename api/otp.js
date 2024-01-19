const cred = require("./cred.js")
const otpURL = 'https://otp.iskconmysore.org/data'
const title = "OTP from IMV Seva App"

const otp = {
  
    send: ({ id, target }) => {
      return new Promise((resolve, reject) => {
        fetch(otpURL, { 
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'api-key': cred.otp.apiKey,
              endpoint: "/send"
            },
            body: JSON.stringify({ id, target, title })
          }
        ).then((response) => {
            if (response.ok) {
              resolve()
            } else {
              reject(`Failed to send OTP to ${id}. Status: ${response.status}`)
            }
          })
          .catch((error) => reject(`Error during OTP-Send request: ${error.message}`))
      })
    },
  
    verify: ({ otp , id }) => {
      return new Promise((resolve, reject) => {
        fetch(otpURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'api-key': cred.otp.apiKey,
            endpoint: "/verify"
          },
          body: JSON.stringify({ otp , id }),
        })
        .then((response) => {
          if (response.ok || response.status==403) {
            resolve(response.status)
          } else {
            reject(`Failed to verify OTP. Status: ${response.status}`)
          }
        })
        .catch((error) => reject(`Error during OTP-verify request: ${error.message}`))
      })
    },
  
  }

module.exports = otp