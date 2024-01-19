const otpURL = 'https://otp.iskconmysore.org/data'

const otp = {
  
    send: ({ id, email, phone }) => {
      return new Promise((resolve, reject) => {
        fetch(otpURL, { 
            method: 'POST',
            body: JSON.stringify({ id, email, phone })
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
          body: JSON.stringify({ otp , id }),
        })
        .then((response) => {
          if (response.ok) {
            resolve('OTP verified')
          } else {
            reject(`Failed to verify OTP. Status: ${response.status}`)
          }
        })
        .catch((error) => reject(`Error during OTP-verify request: ${error.message}`))
      })
    },
  
  }

module.exports = otp