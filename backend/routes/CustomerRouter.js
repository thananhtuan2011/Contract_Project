const express = require('express')
const router = express.Router()
const fileUpload = require('express-fileupload')
const upLoadOpts = {
    useTempFiles: true,
    tempFileDir: '/tmp/'
}
const CustomerController = require('../controllers/CustomerController')

router.post('/getallcustomer', CustomerController.getAllCustomers)
router.post('/addCustomers', CustomerController.addCustomers)
router.post('/deleteCustomer/:id', CustomerController.deleteCustomers)
router.post('/updateCustomers/:id', CustomerController.updateCustomers)
router.get('/getAllTypeCustomer', CustomerController.getAllTypeCustomer)
router.get('/getAllLevel', CustomerController.getAllLevel)
router.post('/ImportData', fileUpload(upLoadOpts), CustomerController.ImportData)


// router.post('/exportCustomer', CustomerController.exportCustomer)
// router.get('/GetInforUser/:id', AcountController.GetInforUser)
// router.post('/updateAcountRoleDeparment/:id', AcountController.updateAcountRoleDeparment)


// router.post('/update',ProfileController.getDetailsUser)
// router.post('/delete',ProfileController.)

module.exports = router