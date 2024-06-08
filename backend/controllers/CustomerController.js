
const db = require('../models')
const jwtHelper = require("../helpers/jwt.helper");
const XLSX = require('xlsx')
const fs = require("fs")
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "access-token-secret-example-quanghungdev.com-green-cat-a@";
// create main Model
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Customers = db.customers
const Suppliers = db.suppliers
const Acount = db.accounts
const Type_customer = db.type_customers
const Level = db.levels
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
            let date_ob = new Date();
            let info = {
                customerName: data[i].customerName,
                email: data[i].email,
                phone: data[i].phone,
                address: data[i].address,
                // idsuppliers: req.body.idsuppliers,
                account_id: decoded._id,
                createdAt: date_ob,
                updatedAt: null

            }

            await Customers.create(info)


        }
        res.status(200).send({ status: 1 })

    }
    catch (error) {
        res.status(200).send({ status: 0 })
    }





}
const updateCustomers = async (req, res) => {

    let id = req.params.id
    const dt = await Customers.update(req.body, { where: { customer_id: id } })

    res.status(200).send(dt)


}
// const updateAcountRoleDeparment = async (req, res) => {

//     let id = req.params.id
//     const dt = await Acount.update(req.body, { where: { account_id: id } })

//     res.status(200).send(dt)


// }

const getAllCustomers = async (req, res) => {
    try {
        let pageSizes = [];
        let limit = req.body.paginator.pageSize;
        let query = {}

        if (!isEmpty(req.body.filter)) {
            if (req.body.filter.idsuppliers) {
                query = {
                    idsuppliers: req.body.filter.idsuppliers,
                }
            }
            else {
                query = {
                    customerName: { [Op.like]: `%${req.body.filter.customerName}%` },
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
        const data = await Customers.findAndCountAll({
            where: query,
            ...queries,
            include: [{
                model: Acount,
                as: 'accounts'
            },
            {
                model: Acount,
                as: 'accounts_up'
            },
            {
                model: Suppliers,
                as: 'suppliers'
            },
            {
                model: Type_customer,
                as: 'type_customers'
            },
            {
                model: Level,
                as: 'levels'
            }

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
const addCustomers = async (req, res) => {
    try {

        let date_ob = new Date();
        let info = {
            customerName: req.body.customerName,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            idsuppliers: req.body.idsuppliers,
            account_id: req.body.account_id,
            idtype_customers: req.body.idtype_customers,
            id_level: req.body.id_level,
            createdAt: date_ob,

            updatedAt: null

        }

        const data = await Customers.create(info)
        res.status(200).send({ status: 1, data: data })
    }
    catch (error) {
        res.status(200).send({ status: 0, error: error })
    }

}
// 5. delete product by id

const deleteCustomers = async (req, res) => {

    let id = req.params.id

    await Customers.destroy({ where: { customer_id: id } })

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

// const GetInforUser = async (req, res) => {

//     let id = req.params.id

//     const data = await Acount.findOne({ where: { account_id: id } })

//     res.status(200).send(data)

// }

module.exports = { ImportData, getAllLevel, deleteCustomers, addCustomers, getAllCustomers, updateCustomers, getAllTypeCustomer }