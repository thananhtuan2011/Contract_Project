const express = require('express')
const router = express.Router()
const AcountController = require('../controllers/AcountController')

router.post('/getallacount', AcountController.getAllAcount)
router.post('/addAcount', AcountController.addAcount)
router.post('/deleteAccount/:id', AcountController.deleteAccount)
router.post('/updateAcount/:id', AcountController.updateAcount)
router.get('/GetInforUser/:id', AcountController.GetInforUser)
router.post('/updateAcountRoleDeparment/:id', AcountController.updateAcountRoleDeparment)
router.get('/GetAllReviewer', AcountController.GetAllReviewer)
router.post('/updateAcountPass/:id', AcountController.updateAcountPass)


// router.post('/update',ProfileController.getDetailsUser)
// router.post('/delete',ProfileController.)

module.exports = router