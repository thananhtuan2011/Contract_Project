const express = require('express')
const router = express.Router()
const PermissController = require('../controllers/PermissonsController')

router.get('/getRolesUser/:id', PermissController.getRolesUser)

router.get('/getPermiss/:id', PermissController.getPermiss)


router.get('/getPermissAll', PermissController.getPermissAll)

router.get('/getPermissNotInGroup/:id', PermissController.getPermissNotInGroup)







// router.post('/update',ProfileController.getDetailsUser)
// router.post('/delete',ProfileController.)

module.exports = router