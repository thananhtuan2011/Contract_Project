// const reciptService=require('../services/reciptService')

// const view=async (req,res)=>{
//     try {
//         const response=await reciptService.view()
//         return res.status(200).json(response)
//     } catch (error) {
//         return res.status(404).json({message:error})
//     }
// }

// const create=async(req,res)=>{
//     try {
//         const {purpose, type, amount, transactionDate, sta}=req.body
//         const response=await reciptService.create(req.body)
//         return res.status(200).json(response)
//     } catch (error) {
//         return res.status(404).json({message:error})
//     }
// }

// module.exports={view, create}