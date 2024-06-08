const express = require('express')
const router = express.Router()
const ContractController = require('../controllers/ContractController')
const fileUpload = require('express-fileupload')
const upLoadOpts = {
    useTempFiles: true,
    tempFileDir: '/tmp/'
}
router.post('/getAllContracts', ContractController.getAllContracts)

router.post('/addContract', ContractController.addContract)
router.get('/GetAllStatus', ContractController.GetAllStatus)

router.post('/ImportData', fileUpload(upLoadOpts), ContractController.ImportData)


router.post('/getAllContractsByreviewFilter', ContractController.getAllContractsByreviewFilter)


router.post('/deleteContract/:id', ContractController.deleteContract)
router.post('/updateContract/:id', ContractController.updateContract)
router.get('/getAllContractsByreview', ContractController.getAllContractsByreview)
router.get('/getAllContractsByAcount', ContractController.getAllContractsByAcount)

router.get('/GetContractDetail/:id', ContractController.GetContractDetail)

// router.get('/GetInforUser/:id', AcountController.GetInforUser)
// router.post('/updateAcountRoleDeparment/:id', AcountController.updateAcountRoleDeparment)


// router.post('/update',ProfileController.getDetailsUser)
// router.post('/delete',ProfileController.)

module.exports = router