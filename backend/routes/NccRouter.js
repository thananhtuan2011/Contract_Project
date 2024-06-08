const express = require('express')
const router = express.Router()
const NCCController = require('../controllers/NccController')

router.post('/getAllSuppliers', NCCController.getAllSuppliers)
router.post('/addSuppliers', NCCController.addSuppliers)
router.post('/addPartner', NCCController.addPartner)


router.post('/deleteSuppliers/:id', NCCController.deleteSuppliers)
router.post('/updateSuppliers/:id', NCCController.updateSuppliers)

router.post('/UpdatePartner/:id', NCCController.UpdatePartner)
router.post('/getAllPartner', NCCController.getAllPartner)
router.post('/deletePartner/:id', NCCController.deletePartner)


router.get('/getAlltype_suppliers', NCCController.getAlltype_suppliers)
// router.post('/updateAcountRoleDeparment/:id', AcountController.updateAcountRoleDeparment)


// router.post('/update',ProfileController.getDetailsUser)
// router.post('/delete',ProfileController.)

module.exports = router