// const flowService=require('../services/flowService')

// const view=async (req,res)=>{
//     try {
//         const response=await flowService.view()
//         return res.status(200).json(response)
//     } catch (error) {
//         return res.status(404).json({message:error})
//     }
// }

// const create=async(req,res)=>{
//     try {
//         const {plan_id, account_id, recipt_id, payment_id}=req.body
//         const response=await flowService.create(req.body)
//         return res.status(200).json(response)
//     } catch (error) {
//         return res.status(404).json({message:error})
//     }
// }

// module.exports={view, create}