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
const Acount = db.accounts
const Debt_bills = db.debt_bills

const Debts = db.debts
const Contracts = db.contracts
const Customer = db.customers
function isEmpty(object) {
    return Object.keys(object).length === 0
}

const UpdateDebt_invoice = async (req, res) => {
    try {

        let id = req.params.id
        await Debt_bills.update(req.body, { where: { idDebt_bills: id } })

        res.status(200).send({ status: 1 })
    }
    catch (err) {
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


const getAllCustomerByid = async (req, res) => {

    let id = req.params.id
    const dt = await Customer.findOne({ where: { customer_id: id } })

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
const getAlldebt = async (req, res) => {
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
        const data = await Debts.findAndCountAll({
            where: query,
            ...queries,
            include: [{
                model: Acount,
                as: 'accounts'
            }
                , {
                model: Customer,
                as: 'customers'
            },
            {
                model: Contracts,
                as: 'contracts'
            }
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
const getAlldebt_bills = async (req, res) => {
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
        const data = await Debt_bills.findAndCountAll({
            where: query,
            ...queries,
            include: [{
                model: Acount,
                as: 'accounts'
            }
                , {
                model: Customer,
                as: 'customers'
            },
            {
                model: Contracts,
                as: 'contracts'
            }
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


const adddebts = async (req, res) => {
    try {
        let date_ob = new Date();
        let info = {
            type_pay: req.body.type_pay,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            customer_id: req.body.customer_id,
            account_id: req.body.account_id,
            month: req.body.month,
            amount: req.body.amount,
            pay_month: req.body.pay_month,
            Debt_pay: req.body.Debt_pay,
            Debt_amount: req.body.Debt_amount,
            contract_id: req.body.contract_id,
            idDebt_bills: req.body.idDebt_bills,
            Note: req.body.Note,
            type: req.body.type,
            createdAt: date_ob

        }

        const data = await Debts.create(info)
        res.status(200).send({ status: 1, data: data })
    }
    catch (error) {
        res.status(200).send({ status: 0, error: error })
    }

}
const addDebt = async (req, res) => {
    try {
        let date_ob = new Date();
        let info = {
            account_id: req.body.account_id,
            customer_id: req.body.customer_id,
            contract_id: req.body.contract_id,
            date_debt: req.body.date_debt,
            Img: req.body.Img,
            amount: req.body.amount,
            createdAt: date_ob,
            updatedAt: null

        }

        const data = await Debt_bills.create(info)
        res.status(200).send({ status: 1, data: data })
    }
    catch (error) {
        res.status(200).send({ status: 0, error: error })
    }

}
// 5. delete product by id

const deletBebt = async (req, res) => {

    let id = req.params.id

    await Debt_bills.destroy({ where: { idDebt_bills: id } })

    res.status(200).send({ status: 1 })

}
const deletDebt = async (req, res) => {

    let id = req.params.id

    await Debts.destroy({ where: { iddebts: id } })

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

module.exports = { UpdateDebt_invoice, deletDebt, getAlldebt, adddebts, getAllContractsByreviewFilter, GetContractDetail, getAllCustomerByid, getAllContractsByAcount, GetAllStatus, getAllLevel, deletBebt, addDebt, getAlldebt_bills, updateContract, getAllTypeCustomer }