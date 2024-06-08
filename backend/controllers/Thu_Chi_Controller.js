const db = require('../models')
const moment = require('moment');
// create main Model
const Expenses = db.expenses
const Plan_chis = db.plan_chis

const Plans = db.plans
const Collection_category = db.collection_categorys
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Acount = db.accounts
const Plan_thus = db.plan_thus
const Payments = db.payments
const Contract = db.contracts
const Customers = db.customers

const Suppliers = db.suppliers

const Bills = db.bills
const Status = db.status
function isEmpty(object) {
    return Object.keys(object).length === 0
}
const GetDebtById = async (req, res) => {

    let id = req.params.id
    const data = await Bills.findOne({
        where: { id_bill: id },
    })
    res.status(200).send(data)


}
const GetRealityThuById = async (req, res) => {

    let id = req.params.id
    const data = await Bills.findOne({
        where: { id_bill: id },
        include: [{
            model: Acount,
            as: 'accounts'
        }]
    })
    res.status(200).send(data)


}
const GetRealityChiById = async (req, res) => {

    let id = req.params.id
    const data = await db.payments.findOne({
        where: { payment_id: id },
        include: [{
            model: Acount,
            as: 'accounts'
        }]
    })
    res.status(200).send(data)


}

const GetPlanChiById = async (req, res) => {

    let id = req.params.id
    const data = await db.plan_chis.findOne({
        where: { idplan_: id },
    })
    res.status(200).send(data)


}
const GetPlanThuById = async (req, res) => {

    let id = req.params.id
    const data = await Plan_thus.findOne({
        where: { idplan_: id },
    })
    res.status(200).send(data)


}
const UpdateDuyet = async (req, res) => {

    let id = req.params.id
    const dt = await db.payments.update(req.body, { where: { payment_id: id } })

    res.status(200).send(dt)


}
const getAllCollection_category = async (req, res) => {
    try {
        let pageSizes = [];
        let limit = req.body.paginator.pageSize;
        let query = {}
        if (!isEmpty(req.body.filter)) {
            query = {
                name_code: { [Op.like]: `%${req.body.filter.name_code}%` },
            }

        }

        const queries = {
            offset: (req.body.paginator.page - 1) * limit,
            limit
        }

        // if (orderBy) {
        //     queries.order = [[orderBy, sortBy]]
        // }
        const data = await Collection_category.findAndCountAll({
            attributes: ['groupname', 'id_code', 'name_code', 'note'],
            where: query,
            ...queries
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

    }
    catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving tutorials."
        });
    }

}
const getAllCollection_Chi = async (req, res) => {
    try {
        let pageSizes = [];
        let limit = req.body.paginator.pageSize;
        let query = {}
        if (!isEmpty(req.body.filter)) {
            query = {
                idexpenses: { [Op.like]: `%${req.body.filter.idexpenses}%` },
            }

        }

        const queries = {
            offset: (req.body.paginator.page - 1) * limit,
            limit
        }

        // if (orderBy) {
        //     queries.order = [[orderBy, sortBy]]
        // }
        const data = await Expenses.findAndCountAll({
            attributes: ['idexpenses', 'group_name', 'type', 'name_expenses', 'note'],
            where: query,
            ...queries
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

    }
    catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving tutorials."
        });
    }

}
const getAllThuChi = async (req, res) => {
    try {
        let pageSizes = [];
        let limit = req.body.paginator.pageSize;
        let query = {}
        if (!isEmpty(req.body.filter)) {
            if (req.body.filter.status) {
                query = {
                    type: { [Op.like]: `%${req.body.filter.status == 1 ? "Phiếu thu" : "Phiếu chi"}%` }
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
        const data = await Plans.findAndCountAll({

            where: query,
            include: [{
                model: Acount,
                as: 'accounts'
            },
            {
                model: Status,
                as: 'status'
            }],
            ...queries
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

    }
    catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving tutorials."
        });
    }

}
const getAllThu = async (req, res) => {
    try {
        let pageSizes = [];
        let limit = req.body.paginator.pageSize;
        let query = {}
        if (!isEmpty(req.body.filter)) {
            if (req.body.filter.id_code) {
                query = {
                    id_code: { [Op.like]: `%${req.body.filter.id_code}%` }
                }
            }
            if (req.body.filter.datetime) {
                query = {
                    [Op.and]: [
                        Sequelize.where(Sequelize.fn('DAY', Sequelize.col('pay_date')), req.body.filter.datetime.day),
                        Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('pay_date')), req.body.filter.datetime.month),
                        Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('pay_date')), req.body.filter.datetime.year),
                    ],
                }
            }
            // else {
            //     query = {
            //         contract_name: { [Op.like]: `%${req.body.filter.contract_name}%` },
            //     }
            // }

        }

        const queries = {
            offset: (req.body.paginator.page - 1) * limit,
            limit
        }

        // if (orderBy) {
        //     queries.order = [[orderBy, sortBy]]
        // }
        const data = await Plan_thus.findAndCountAll({

            where: query,
            include: [{
                model: Acount,
                as: 'accounts'
            },
            {
                model: Acount,
                as: 'accounts_up'
            },
            {
                model: Customers,
                as: 'customers'
            }

            ],
            ...queries
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

    }
    catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving tutorials."
        });
    }

}
const getAllChi = async (req, res) => {
    try {
        let pageSizes = [];
        let limit = req.body.paginator.pageSize;
        let query = {}
        if (!isEmpty(req.body.filter)) {
            if (req.body.filter.status) {
                query = {
                    type: { [Op.like]: `%${req.body.filter.status == 1 ? "Phiếu thu" : "Phiếu chi"}%` }
                }
            }
            if (req.body.filter.datetime) {
                query = {
                    [Op.and]: [
                        Sequelize.where(Sequelize.fn('DAY', Sequelize.col('pay_date')), req.body.filter.datetime.day),
                        Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('pay_date')), req.body.filter.datetime.month),
                        Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('pay_date')), req.body.filter.datetime.year),
                    ],
                }
            }
            else {
                query = {
                    idexpenses: { [Op.like]: `%${req.body.filter.idexpenses}%` },
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
        const data = await Plan_chis.findAndCountAll({

            where: query,
            include: [

                {
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
                }

            ],
            ...queries
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

    }
    catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving tutorials."
        });
    }

}
const getAllBill = async (req, res) => {
    try {
        // console.log("req. req.body.filter.day", req.body.filter.datetime.day)
        let pageSizes = [];
        let limit = req.body.paginator.pageSize;
        let query = {}
        if (!isEmpty(req.body.filter)) {
            if (req.body.filter.datetime) {
                query = {
                    [Op.and]: [
                        Sequelize.where(Sequelize.fn('DAY', Sequelize.col('Date_bill')), req.body.filter.datetime.day),
                        Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('Date_bill')), req.body.filter.datetime.month),
                        Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('Date_bill')), req.body.filter.datetime.year),
                    ],
                }
            }
            else if (req.body.filter.id_code) {
                query = {
                    id_code: { [Op.like]: `%${req.body.filter.id_code}%` },
                }
            }
            else {
                query = {

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
        const data = await Bills.findAndCountAll({

            where: query,
            include: [

                {
                    model: Acount,
                    as: 'accounts'
                },

                {
                    model: Customers,
                    as: 'customers'
                },

                {
                    model: Acount,
                    as: 'accounts_up_bill'
                },
            ],
            ...queries
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

    }
    catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving tutorials."
        });
    }

}
const uploadFiles = async (req, res) => {
    try {
        console.log(req.file);

        if (req.file == undefined) {
            return res.send(`You must select a file.`);
        }

        Image.create({
            type: req.file.mimetype,
            name: req.file.originalname,
            data: fs.readFileSync(
                __basedir + "/uploads/" + req.file.filename
            ),
        }).then((image) => {
            fs.writeFileSync(
                __basedir + "/resources/static/assets/tmp/" + image.name,
                image.data
            );

            return res.send(`File has been uploaded.`);
        });
    } catch (error) {
        console.log(error);
        return res.send(`Error when trying upload images: ${error}`);
    }
};
const UpdatePlan = async (req, res) => {

    let id = req.params.id
    const dt = await db.plans.update(req.body, { where: { idPlan: id } })

    res.status(200).send(dt)


}
const UpdatePlanChi = async (req, res) => {

    let id = req.params.id
    const dt = await db.plan_chis.update(req.body, { where: { idplan_: id } })

    res.status(200).send(dt)


}
const GetChartPlanChi_ThucTe = async (req, res) => {
    let year = req.params.year
    const dt = await db.payments.findAll({
        attributes: [
            [db.sequelize.fn("MONTH", db.sequelize.col("Pay_date")), "name"],
            [db.sequelize.fn("YEAR", db.sequelize.col("Pay_date")), "year"],
            [db.sequelize.fn("count", "amount"), "paycount"],
            [db.sequelize.fn('SUM', db.sequelize.col('amount')), 'value'],
        ], where: {

            [Op.and]: [
                { status: 1 },
                Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('Pay_date')), year)

                //     Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('Pay_date'), year), {

                //     })
            ]
        }, group: 'name'
        // Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('Pay_date')), year), group: 'name',


    })

    res.status(200).send(dt)


}
// .utc(data[i].date_complete.toLocaleString(), 'DD-MM-YYYY')
const GetChartPlanChi = async (req, res) => {
    let year = req.params.year
    //var momentDate = new moment('2018-08-31T20:13:00.000Z');
    const dt = await db.plan_chis.findAll({
        attributes: [
            [db.sequelize.fn("MONTH", db.sequelize.col("pay_date")), "name"],
            [db.sequelize.fn("YEAR", db.sequelize.col("pay_date")), "year"],
            [db.sequelize.fn("count", "pay"), "paycount"],
            [db.sequelize.fn('SUM', db.sequelize.col('pay')), 'value'],
        ], where: Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('pay_date')), year), group: 'name'
    })

    res.status(200).send(dt)


}
function convertUTCDateToLocalDate(date) {
    var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();

    newDate.setHours(hours - offset);

    return newDate;
}
const GetChartPlanThu_ThucTe = async (req, res) => {
    let year = req.params.year
    const dt = await db.bills.findAll({
        attributes: [
            [db.sequelize.fn("MONTH", db.sequelize.col("Date_bill")), "name"],
            [db.sequelize.fn("YEAR", db.sequelize.col("Date_bill")), "year"],
            [db.sequelize.fn("count", "Total_amount"), "paycount"],
            [db.sequelize.fn('SUM', db.sequelize.col('Total_amount')), 'value'],
        ], where: Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('Date_bill')), year), group: 'name'
    })

    res.status(200).send(dt)


}
const GetChartPlanThu = async (req, res) => {
    let year = req.params.year

    const dt = await db.plan_thus.findAll({
        attributes: [
            [db.sequelize.fn("MONTH", db.sequelize.col("pay_date")), "name"],
            [db.sequelize.fn("YEAR", db.sequelize.col("pay_date")), "year"],
            [db.sequelize.fn("count", "pay"), "paycount"],
            [db.sequelize.fn('SUM', db.sequelize.col('pay')), 'value'],
        ], where: Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('pay_date')), year), group: 'name'
    })

    res.status(200).send(dt)


}
const UpdatePlanThu = async (req, res) => {
    let id = req.params.id
    const dt = await db.plan_thus.update(req.body, { where: { idplan_: id } })

    res.status(200).send(dt)


}
const GetpaymentssById = async (req, res) => {

    let id = req.params.id
    const data = await db.payments.findOne({
        where: { payment_id: id },
    })
    res.status(200).send(data)


}
const UpdateThu = async (req, res) => {

    let id = req.params.id
    await db.bills.update(req.body, { where: { id_bill: id } })

    res.status(200).send({ status: 1 })


}
const UpdateChi = async (req, res) => {

    let id = req.params.id
    await db.payments.update(req.body, { where: { payment_id: id } })

    res.status(200).send({ status: 1 })


}

const Update_DM_Thu = async (req, res) => {

    let id = req.params.id
    await db.collection_categorys.update(req.body, { where: { id_code: id } })

    res.status(200).send({ status: 1 })


}

const deleteDM_Thu = async (req, res) => {

    let id = req.params.id

    await db.collection_categorys.destroy({ where: { id_code: id } })

    res.status(200).send({ status: 1 })

}

const addDM_Thu = async (req, res) => {
    let info = {
        id_code: req.body.id_code,
        name_code: req.body.name_code,
        note: req.body.note,
        groupname: ""


    }

    const data = await db.collection_categorys.create(info)
    res.status(200).send(data)


}
const deleteDM_Chi = async (req, res) => {

    let id = req.params.id

    await Expenses.destroy({ where: { idexpenses: id } })

    res.status(200).send({ status: 1 })

}
const UpdateDM_Chi = async (req, res) => {

    let id = req.params.id

    await Expenses.update(req.body, { where: { idexpenses: id } })

    res.status(200).send({ status: 1 })

}
const addDM_Chi = async (req, res) => {
    let info = {
        idexpenses: req.body.idexpenses,
        name_expenses: req.body.name_expenses,
        type: req.body.type,
        note: req.body.note,
        group_name: ""


    }

    const data = await Expenses.create(info)
    res.status(200).send(data)


}
const addThuPlan = async (req, res) => {
    let date_ob = new Date();
    let info = {
        pay: req.body.pay,
        pay_date: req.body.pay_date,
        customer_id: req.body.customer_id,
        account_id: req.body.account_id,
        id_code: req.body.id_code,
        createdAt: date_ob,
        updatedAt: null,

    }

    const data = await Plan_thus.create(info)
    res.status(200).send(data)


}
const addChiPlan = async (req, res) => {
    let date_ob = new Date();
    let info = {
        pay: req.body.pay,
        pay_date: req.body.pay_date,
        idsuppliers: req.body.idsuppliers,
        account_id: req.body.account_id,
        idexpenses: req.body.idexpenses,
        createdAt: date_ob,
        updatedAt: null,

    }

    const data = await Plan_chis.create(info)
    res.status(200).send(data)


}


const addThuChi = async (req, res) => {
    let date_ob = new Date();
    let info = {
        reason: req.body.reason,
        type: req.body.type,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        type_pay: req.body.type_pay,
        status_id: req.body.status_id,
        account_id: req.body.account_id,
        contract_id: req.body.contract_id,
        createdAt: date_ob,
        updatedAt: null,

    }

    const data = await Plans.create(info)
    res.status(200).send(data)


}
const addBills = async (req, res) => {
    let date_ob = new Date();
    let info = {
        Total_amount: req.body.Total_amount,
        type: req.body.type,
        Img: req.body.Img,
        Date_bill: req.body.Date_bill,
        id_code: req.body.id_code,
        customer_id: req.body.customer_id,
        account_id: req.body.account_id,
        createdAt: date_ob,
        updatedAt: null,

    }

    const data = await Bills.create(info)
    res.status(200).send(data)


}
const addPays = async (req, res) => {
    let date_ob = new Date();

    let info = {
        amount: req.body.amount,
        type_pay: req.body.type_pay,
        idexpenses: req.body.idexpenses,
        Pay_date: req.body.Pay_date,
        Img: req.body.Img,
        status: req.body.status,
        account_id: req.body.account_id,
        approved_by: req.body.approved_by,
        idsuppliers: req.body.idsuppliers,
        createdAt: date_ob,
        updatedAt: null,

    }

    const data = await Payments.create(info)
    res.status(200).send(data)


}
// 5. delete product by id
const deletePlanChi = async (req, res) => {

    let id = req.params.id

    await Plan_chis.destroy({ where: { idplan_: id } })

    res.status(200).send({ status: 1 })

}
const deletePlanThu = async (req, res) => {

    let id = req.params.id

    await Plan_thus.destroy({ where: { idplan_: id } })

    res.status(200).send({ status: 1 })

}
const deletePlan = async (req, res) => {

    let id = req.params.id

    await Plans.destroy({ where: { idPlan: id } })

    res.status(200).send({ status: 1 })

}
const deleteThu = async (req, res) => {

    let id = req.params.id

    await Bills.destroy({ where: { id_bill: id } })

    res.status(200).send({ status: 1 })

}
const getContractsById = async (req, res) => {
    let id = req.params.id

    const dt = await Contract.findOne({ where: { contract_id: id } })

    res.status(200).send(dt)


}
const deletePay = async (req, res) => {

    let id = req.params.id

    await Payments.destroy({ where: { payment_id: id } })

    res.status(200).send({ status: 1 })

}
const GetPlanById_Chi = async (req, res) => {

    let id = req.params.id

    const data = await Plan_chis.findOne({
        where: { idplan_: id },

        include: [{
            model: Acount,
            as: 'accounts'
        },
        ],
    })

    res.status(200).send(data)

}
const GetPlanById_Thu = async (req, res) => {

    let id = req.params.id

    const data = await Plan_thus.findOne({
        where: { idplan_: id },
        include: [{
            model: Acount,
            as: 'accounts'
        },
        ],
    })

    res.status(200).send(data)

}
const GetPlanById = async (req, res) => {

    let id = req.params.id

    const data = await Plans.findOne({ where: { idPlan: id } })

    res.status(200).send(data)

}
const getAllPayments = async (req, res) => {
    try {
        let pageSizes = [];
        let limit = req.body.paginator.pageSize;
        let query = {}
        if (!isEmpty(req.body.filter)) {
            if (req.body.filter.datetime) {
                query = {
                    [Op.and]: [
                        Sequelize.where(Sequelize.fn('DAY', Sequelize.col('Pay_date')), req.body.filter.datetime.day),
                        Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('Pay_date')), req.body.filter.datetime.month),
                        Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('Pay_date')), req.body.filter.datetime.year),
                    ],
                }
            }
            else if (req.body.filter.status) {
                query = {
                    status: req.body.filter.status

                }
            }
            else if (req.body.filter.idexpenses) {
                query = {
                    idexpenses: { [Op.like]: `%${req.body.filter.idexpenses}%` },
                }
            }
            else {
                query = {
                    // contract_name: { [Op.like]: `%${req.body.filter.contract_name}%` },
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
        const data = await Payments.findAndCountAll({

            where: query,
            include: [{
                model: Acount,
                as: 'accounts'
            },
            {
                model: Acount,
                as: 'account_up'
            },
            {
                model: Suppliers,
                as: 'suppliers'
            },

            ],
            ...queries
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

    }
    catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving tutorials."
        });
    }

}

module.exports = {
    GetRealityChiById, GetRealityThuById, UpdateDuyet, GetChartPlanThu_ThucTe, GetChartPlanChi_ThucTe, GetChartPlanChi, deleteDM_Chi, deleteDM_Thu, GetChartPlanThu, addDM_Chi, addDM_Thu,
    UpdatePlanThu, UpdatePlanChi, GetPlanById_Thu, GetPlanById_Chi, deletePlanChi,
    deletePlanThu, getAllChi, addChiPlan, getAllThu, addThuPlan, UpdateChi,
    GetpaymentssById, UpdateThu, GetDebtById, getContractsById, deletePay, getAllPayments,
    deleteThu, addPays, getAllBill, addBills, GetPlanById, getAllThuChi,
    Update_DM_Thu,
    UpdateDM_Chi,
    getAllCollection_Chi, getAllCollection_category, addThuChi, deletePlan, UpdatePlan
}