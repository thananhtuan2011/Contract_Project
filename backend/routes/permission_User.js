const express = require('express')
const router = express.Router()
const Permiss_UserController = require('../controllers/Permissions_UserController')

router.post('/getPermiss_User', Permiss_UserController.getPermiss_User)
router.post('/getPermiss_Bypermisson/:id', Permiss_UserController.getPermiss_Bypermisson)
router.get('/GetGroupPermiss', Permiss_UserController.GetGroupPermiss)
router.get('/GetGroupRoleUser/:id', Permiss_UserController.GetGroupRoleUser)

router.post('/addGroupAcountRoles', Permiss_UserController.addGroupAcountRoles)

router.post('/DeleteGroupRoles/:id', Permiss_UserController.DeleteGroupRoles)
router.post('/addGroupRolesWithPermiss', Permiss_UserController.addGroupRolesWithPermiss)
router.post('/DeleteGroup/:id', Permiss_UserController.DeleteGroup)

router.post('/updateRolesPermis', Permiss_UserController.updateRolesPermis)











// router.post('/update',ProfileController.getDetailsUser)
// router.post('/delete',ProfileController.)

module.exports = router