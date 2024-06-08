const express = require('express')
const router = express.Router()
const DepartmentController = require('../controllers/DepartmentController')

router.post('/getAllDepartment', DepartmentController.getAllDepartment)
router.post('/addDepartment', DepartmentController.addDepartment)
router.post('/deleteDepartment/:id', DepartmentController.deleteDepartment)

router.post('/updateDepartment/:id', DepartmentController.updateDepartment)
// router.post('/update',ProfileController.getDetailsUser)
// router.post('/delete',ProfileController.)

module.exports = router