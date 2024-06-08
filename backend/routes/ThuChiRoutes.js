const express = require('express')
const router = express.Router()
const ThuchiController = require('../controllers/Thu_Chi_Controller')
const BebtController = require('../controllers/DebtController')


router.post('/getAlldebt_bills', BebtController.getAlldebt_bills)
router.post('/getAllCollection_category', ThuchiController.getAllCollection_category)
router.post('/getAllCollection_Chi', ThuchiController.getAllCollection_Chi)
router.post('/getAllThuChi', ThuchiController.getAllThuChi)
router.post('/addBills', ThuchiController.addBills)
router.post('/addThuPlan', ThuchiController.addThuPlan)
router.post('/getAllThu', ThuchiController.getAllThu)
router.post('/addChiPlan', ThuchiController.addChiPlan)
router.post('/getAllChi', ThuchiController.getAllChi)


router.post('/getAllBill', ThuchiController.getAllBill)
router.post('/addPays', ThuchiController.addPays)
router.post('/addDebt', BebtController.addDebt)

router.post('/adddebts', BebtController.adddebts)
router.post('/getAllPayments', ThuchiController.getAllPayments)
router.post('/getAlldebt', BebtController.getAlldebt)
router.post('/deletDebt/:id', BebtController.deletDebt)
router.post('/deleteDM_Chi/:id', ThuchiController.deleteDM_Chi)

router.post('/deleteDM_Thu/:id', ThuchiController.deleteDM_Thu)

router.get('/GetDebtById/:id', ThuchiController.GetDebtById)
router.post('/UpdateDM_Chi/:id', ThuchiController.UpdateDM_Chi)

router.post('/UpdateThu/:id', ThuchiController.UpdateThu)
router.get('/Getpayments/:id', ThuchiController.GetpaymentssById)
router.post('/UpdateChi/:id', ThuchiController.UpdateChi)

router.post('/UpdateDuyet/:id', ThuchiController.UpdateDuyet)
router.post('/addDM_Chi', ThuchiController.addDM_Chi)
router.post('/addDM_Thu', ThuchiController.addDM_Thu)
router.post('/GetChartPlanThu/:year', ThuchiController.GetChartPlanThu)
router.post('/GetChartPlanChi/:year', ThuchiController.GetChartPlanChi)
router.post('/GetChartPlanChi_ThucTe/:year', ThuchiController.GetChartPlanChi_ThucTe)
router.post('/GetChartPlanThu_ThucTe/:year', ThuchiController.GetChartPlanThu_ThucTe)










router.get('/getContractsById/:id', ThuchiController.getContractsById)

router.post('/addThuChi', ThuchiController.addThuChi)
router.get('/GetPlanById/:id', ThuchiController.GetPlanById)

router.get('/GetPlanById_Thu/:id', ThuchiController.GetPlanById_Thu)

router.get('/GetPlanById_Chi/:id', ThuchiController.GetPlanById_Chi)

router.get('/GetRealityChiById/:id', ThuchiController.GetRealityChiById)

router.get('/GetRealityThuById/:id', ThuchiController.GetRealityThuById)


router.post('/UpdatePlan/:id', ThuchiController.UpdatePlan)
router.post('/Update_DM_Thu/:id', ThuchiController.Update_DM_Thu)





router.post('/UpdatePlanThu/:id', ThuchiController.UpdatePlanThu)

router.post('/UpdatePlanChi/:id', ThuchiController.UpdatePlanChi)


router.post('/UpdateDebt_invoice/:id', BebtController.UpdateDebt_invoice)


router.post('/deletBebt/:id', BebtController.deletBebt)

router.get('/getAllCustomerByid/:id', BebtController.getAllCustomerByid)
router.post('/deletePlanChi/:id', ThuchiController.deletePlanChi)
router.post('/deletePlanThu/:id', ThuchiController.deletePlanThu)


router.post('/deletePay/:id', ThuchiController.deletePay)



router.post('/deleteThu/:id', ThuchiController.deleteThu)


router.post('/deletePlan/:id', ThuchiController.deletePlan)
// router.post('/updateAcountRoleDeparment/:id', AcountController.updateAcountRoleDeparment)


// router.post('/update',ProfileController.getDetailsUser)
// router.post('/delete',ProfileController.)

module.exports = router