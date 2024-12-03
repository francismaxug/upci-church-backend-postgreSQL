// @ts-nocheck
const apiip = require("apiip.net")("f3e954e8-4601-4ff7-9fc1-bef3581f7bf0")

// Get location information from API

const resultsLocation = apiip
  .getLocation()
  .then((results) => {
    return results
  })
  .catch((error) => console.error(error))

export default resultsLocation
