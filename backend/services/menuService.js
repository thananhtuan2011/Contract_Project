const menuModel = require('../models/menuModel')



const _servics_getmenu = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await menuModel.getMenu()

            if (data) {
                resolve({
                    status: 1,
                    message: ' successfully',
                    data
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {

    _servics_getmenu: _servics_getmenu

}