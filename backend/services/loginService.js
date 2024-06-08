const loginModel = require('../models/loginModel')

const login = (data) => {
  return new Promise(async (resolve, reject) => {
    const { username, password } = data
    try {
      const getall = await loginModel.double(username, password)

      if (getall[0]) {
        const recordset = await loginModel.single(username)
        if (recordset.length > 0) {
          if (recordset[0].func_view == 1) {
            checkPermissionView = true;
          }
        }
        resolve("true");
      } else {
        resolve("false");
        checkPermissionView = false;
      }
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = { login };