const cred = require("./cred.js")
const cdnURL = 'https://cdn.iskconmysore.org/content?path=vseva/dp'

const cdn = {
  
    head: (filename) => {
      return new Promise((resolve, reject) => {
        fetch(`${cdnURL}/${filename}`, { method: 'HEAD' })
          .then((response) => {
            if (response.ok) {
              resolve()
            } else {
              reject(`Failed to perform HEAD request. Status: ${response.status}`)
            }
          })
          .catch((error) => reject(`Error during HEAD request: ${error.message}`))
      })
    },
  
    put: (filename, binaryFile) => {
      return new Promise((resolve, reject) => {
        fetch(`${cdnURL}/${filename}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'image/jpeg',
            'api-key': cred.cdn.apiKey
          },
          body: binaryFile,
        })
          .then((response) => {
            if (response.ok) {
              resolve('File updated successfully')
            } else {
              reject(`Failed to perform PUT request. Status: ${response.status}`)
            }
          })
          .catch((error) => reject(`Error during PUT request: ${error.message}`))
      })
    },
  
    delete: (filename) => {
      return new Promise((resolve, reject) => {
        fetch(`${cdnURL}/${filename}`, {
          method: 'DELETE',
          headers: {
            'api-key': cred.cdn.apiKey
          },
        })
          .then((response) => {
            if (response.ok) {
              resolve('File deleted successfully')
            } else {
              reject(`Failed to perform DELETE request. Status: ${response.status}`)
            }
          })
          .catch((error) => reject(`Error during DELETE request: ${error.message}`))
      })
    },
  
  }

module.exports = cdn