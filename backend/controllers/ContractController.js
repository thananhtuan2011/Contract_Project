const moment = require('moment');
const db = require('../models')
const jwtHelper = require("../helpers/jwt.helper");
const XLSX = require('xlsx')
const fs = require("fs")
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "access-token-secret-example-quanghungdev.com-green-cat-a@";
// create main Model
const Sequelize = require('sequelize');
const { query } = require('express');
const Op = Sequelize.Op;
const Customers = db.customers
const Acount = db.accounts
const Type_suppliers = db.type_suppliers
const Contract = db.contracts
const Status = db.status
function isEmpty(object) {
    return Object.keys(object).length === 0
}


// const exportCustomer = async (req, res) => {
//     const User = [
//         {
//             fname: "John",
//             lname: "Doe",
//             email: "john.doe@example.com",
//             gender: "Male",
//         },
//         {
//             fname: "Jane",
//             lname: "Doe",
//             email: "jane.doe@example.com",
//             gender: "Female",
//         },
//         {
//             fname: "Bob",
//             lname: "Smith",
//             email: "bob.smith@example.com",
//             gender: "Male",
//         },
//     ];
//     const workbook = new excelJS.Workbook();
//     const worksheet = workbook.addWorksheet("Customer");

//     // Define columns in the worksheet 
//     // worksheet.columns = [
//     //     { header: "CustomerId", key: "customer_id", width: 15 },
//     //     { header: "Address", key: "address", width: 15 },
//     //     { header: "CustomerName", key: "customerName", width: 25 },
//     //     { header: "Phone", key: "phone", width: 10 },
//     //     { header: "Level", key: "level", width: 10 },
//     //     { header: "Type", key: "type", width: 10 },
//     //     { header: "createdAt", key: "createdAt", width: 10 },
//     //     { header: "Email", key: "email", width: 10 },
//     // ];

//     // Add data to the worksheet 
//     worksheet.columns = [
//         { header: "First Name", key: "fname", width: 15 },
//         { header: "Last Name", key: "lname", width: 15 },
//         { header: "Email", key: "email", width: 25 },
//         { header: "Gender", key: "gender", width: 10 },
//     ];

//     // User.forEach(user => { worksheet.addRow(user); });
//     worksheet.addRow({
//         fname: "Jane",
//         lname: "Doe",
//         email: "jane.doe@example.com",
//         gender: "Female",
//     }).commit();
//     // Set up the response headers 
//     res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"); res.setHeader("Content-Disposition", "attachment; filename=" + "users.xlsx");

//     // Write the workbook to the response object 
//     workbook.xlsx.write(res).then(() => res.end());
// };

const ImportData = async (req, res) => {
    const tokenFromClient = req.body.token || req.query.token || req.headers["x-access-token"];

    // Nếu tồn tại token

    // Thực hiện giải mã token xem có hợp lệ hay không?

    const decoded = await jwtHelper.verifyToken(tokenFromClient, accessTokenSecret);
    try {
        const { excel } = req.files
        if (excel.mimetype !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
            return res.status(400).json({ mess: "File is invalid" })

        }
        const ww = XLSX.readFile(excel.tempFilePath);
        const sheetname = ww.SheetNames[0]
        const data = XLSX.utils.sheet_to_json(ww.Sheets[sheetname])
        for (let i = 0; i < data.length; i++) {
            // console.log("data" + i, data[i])
            // let res = moment(data[i].date_complete, "DD. M. YYYY"); // this will be valid moment date now
            // console.log(moment(data[i].date_complete, 'DD-MM-YYYY'));
            let date_ob = new Date();
            let typeint = 0;

            if (data[i].type == "Nhà cung cấp") {
                typeint = 1;
            } else if (data[i].type == "Đại lý") {
                typeint = 2;
            } else {
                typeint = 3;
            }
            let info = {
                contract_name: data[i].contract_name,
                partner_name: data[i].partner_name,
                status_id: data[i].status == "hoàn thành" ? 1 : 2,
                idtype_suppliers: typeint,
                date_complete: moment.utc(data[i].date_complete.toLocaleString(), 'DD-MM-YYYY'),
                value_contract: data[i].value_contract,
                note: data[i].note,
                account_id: decoded._id,
                customer_id: data[i].customer,
                createdAt: date_ob,
                updatedAt: null

            }
            console.log("info", info)
            await Contract.create(info)


        }
        res.status(200).send({ status: 1 })

    }
    catch (error) {
        res.status(200).send({ status: 0 })
    }





}
const updateContract = async (req, res) => {

    let id = req.params.id
    const dt = await Contract.update(req.body, { where: { contract_id: id } })

    res.status(200).send(dt)


}
const GetContractDetail = async (req, res) => {

    let id = req.params.id
    // const dt = await Contract.findOne({ where: { contract_id: id } })
    const data = await Contract.findOne({
        where: { contract_id: id },
        include: [{
            model: Acount,
            as: 'accounts'
        }
            , {
            model: Type_suppliers,
            as: 'type_suppliers'
        },
        {
            model: Status,
            as: 'status'
        },
            // {
            //     model: Level,
            //     as: 'levels'
            // }

        ],

    })
    res.status(200).send(data)


}
const getAllContractsByreview = async (req, res) => {

    const tokenFromClient = req.body.token || req.query.token || req.headers["x-access-token"];

    // Nếu tồn tại token

    // Thực hiện giải mã token xem có hợp lệ hay không?

    const decoded = await jwtHelper.verifyToken(tokenFromClient, accessTokenSecret);
    const dt = await Contract.findAll({ where: { account_id_reviewer: decoded._id } })

    res.status(200).send(dt)


}
const getAllContractsByreviewFilter = async (req, res) => {

    const tokenFromClient = req.body.token || req.query.token || req.headers["x-access-token"];

    // Nếu tồn tại token

    // Thực hiện giải mã token xem có hợp lệ hay không?

    const decoded = await jwtHelper.verifyToken(tokenFromClient, accessTokenSecret);

    const dt = await Contract.findAll({ where: { account_id_reviewer: decoded._id, status_id: req.body.filter.status_id } })
    res.status(200).send(dt)



}
const getAllContractsByAcount = async (req, res) => {

    const tokenFromClient = req.body.token || req.query.token || req.headers["x-access-token"];

    // Nếu tồn tại token

    // Thực hiện giải mã token xem có hợp lệ hay không?

    const decoded = await jwtHelper.verifyToken(tokenFromClient, accessTokenSecret);
    const dt = await Contract.findAll({ where: { account_id: decoded._id } })
    res.status(200).send(dt)


}

const getAllContracts = async (req, res) => {
    try {
        let pageSizes = [];
        let limit = req.body.paginator.pageSize;
        let query = {}
        if (!isEmpty(req.body.filter)) {
            if (req.body.filter.status_id) {
                query = {
                    status_id: req.body.filter.status_id,
                }
            }
            else {
                query = {
                    contract_name: { [Op.like]: `%${req.body.filter.contract_name}%` },
                }
            }



        }

        const queries = {
            offset: (req.body.paginator.page - 1) * limit,
            limit
        }

        // if (orderBy) {
        //     queries.order = [[orderBy, sortBy]]
        // }
        const data = await Contract.findAndCountAll({
            where: query,
            ...queries,
            include: [{
                model: Acount,
                as: 'accounts'
            }
                , {
                model: Type_suppliers,
                as: 'type_suppliers'
            },
            {
                model: Status,
                as: 'status'
            },
                // {
                //     model: Level,
                //     as: 'levels'
                // }

            ],

        })

        let count_page = Math.ceil(data?.count / limit)
        pageSizes = Array.from({ length: count_page }, (_, i) => i + 1)

        const response = {
            totalpage: count_page,
            total: data?.count,
            page: req.body.paginator.page,
            pageSize: limit,
            pageSizes: pageSizes,
            data: data?.rows
        }
        res.send(response);
        // const { limit, offset } = getPagination(req.body.page, req.body.pageSize);
        // let dt = await Acount.findAll({ where: query, ...queries })
        //     .then(data => {
        //         console.log('dataaa', dt.count)
        //         console.log('count', data.length)
        //         const response = {
        //             totalPages: Math.ceil(data?.length / limit),
        //             totalItems: data?.length,
        //             data: data
        //         }
        //         res.send(response);
        //     })
    }
    catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving tutorials."
        });
    }

}
const addContract = async (req, res) => {
    try {
        let date_ob = new Date();
        let info = {
            account_id: req.body.account_id,
            note: req.body.note,
            date_complete: req.body.date_complete,
            status_id: req.body.status_id,
            contract_name: req.body.contract_name,
            idtype_suppliers: req.body.type_contract,
            partner_name: req.body.partner_name,
            value_contract: req.body.value_contract,
            customer_id: req.body.customer_id,
            account_id_reviewer: req.body.account_id_reviewer,
            createdAt: date_ob,

            updatedAt: null

        }

        const data = await Contract.create(info)
        res.status(200).send({ status: 1, data: data })
    }
    catch (error) {
        res.status(200).send({ status: 0, error: error })
    }

}
// 5. delete product by id

const deleteContract = async (req, res) => {

    let id = req.params.id

    await Contract.destroy({ where: { contract_id: id } })

    res.status(200).send({ status: 1 })

}
const getAllTypeCustomer = async (req, res) => {
    const data = await Type_customer.findAll();
    res.status(200).send({ status: 1, data: data })
}
const getAllLevel = async (req, res) => {
    const data = await Level.findAll();
    res.status(200).send({ status: 1, data: data })
}

const GetAllStatus = async (req, res) => {


    const data = await Status.findAll()

    res.status(200).send(data)

}

module.exports = { getAllContractsByreviewFilter, GetContractDetail, getAllContractsByreview, getAllContractsByAcount, GetAllStatus, ImportData, getAllLevel, deleteContract, addContract, getAllContracts, updateContract, getAllTypeCustomer }