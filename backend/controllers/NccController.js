
const db = require('../models')
// create main Model
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Suppliers = db.suppliers
const Type_suppliers = db.type_suppliers
const Acount = db.accounts
const Level = db.levels
function isEmpty(object) {
    return Object.keys(object).length === 0
}
const updateSuppliers = async (req, res) => {

    let id = req.params.id
    const dt = await Suppliers.update(req.body, { where: { idsuppliers: id } })

    res.status(200).send(dt)


}
const UpdatePartner = async (req, res) => {
    try {

        let id = req.params.id
        const dt = await Type_suppliers.update(req.body, { where: { idtype_suppliers: id } })

        res.status(200).send({ status: 1 })

    }
    catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving tutorials."
        });
    }
}
// const updateAcountRoleDeparment = async (req, res) => {

//     let id = req.params.id
//     const dt = await Acount.update(req.body, { where: { account_id: id } })

//     res.status(200).send(dt)


// }
const getAllPartner = async (req, res) => {
    try {
        let pageSizes = [];
        let limit = req.body.paginator.pageSize;
        let query = {}

        if (!isEmpty(req.body.filter)) {
            if (req.body.filter.department_id) {
                query = {
                    department_id: req.body.filter.department_id,
                }
            }
            else {
                query = {
                    type_name: { [Op.like]: `%${req.body.filter.type_name}%` },
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
        const data = await Type_suppliers.findAndCountAll({
            where: query,
            ...queries,
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

const getAllSuppliers = async (req, res) => {
    try {
        let pageSizes = [];
        let limit = req.body.paginator.pageSize;
        let query = {}

        if (!isEmpty(req.body.filter)) {
            if (req.body.filter.department_id) {
                query = {
                    department_id: req.body.filter.department_id,
                }
            }
            else {
                query = {
                    supplieName: { [Op.like]: `%${req.body.filter.supplieName}%` },
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
        const data = await Suppliers.findAndCountAll({
            where: query,
            ...queries,
            include: [{
                model: Acount,
                as: 'accounts'
            },
            {
                model: Acount,
                as: 'accounts_up'
            }

                , {
                model: Type_suppliers,
                as: 'type_suppliers'
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
const addSuppliers = async (req, res) => {
    try {

        let date_ob = new Date();
        let info = {
            supplieName: req.body.supName,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            account_id: req.body.account_id,
            createdAt: date_ob,
            idtype_suppliers: req.body.idtype_suppliers,
            id_level: req.body.id_level,
            updatedAt: null

        }

        const data = await Suppliers.create(info)
        res.status(200).send({ status: 1, data: data })
    }
    catch (error) {
        res.status(200).send({ status: 0, error: error })
    }

}
const addPartner = async (req, res) => {
    try {

        let date_ob = new Date();
        let info = {
            type_name: req.body.type_name,
            account_id: req.body.account_id,
            createdAt: date_ob,
            updatedAt: null

        }

        const data = await Type_suppliers.create(info)
        res.status(200).send({ status: 1, data: data })
    }
    catch (error) {
        res.status(200).send({ status: 0, error: error })
    }

}

// 5. delete product by id

const deleteSuppliers = async (req, res) => {

    let id = req.params.id

    await Suppliers.destroy({ where: { idsuppliers: id } })

    res.status(200).send({ status: 1 })

}
const deletePartner = async (req, res) => {

    let id = req.params.id

    await Type_suppliers.destroy({ where: { idtype_suppliers: id } })

    res.status(200).send({ status: 1 })

}
const getAlltype_suppliers = async (req, res) => {

    const data = await Type_suppliers.findAll()

    res.status(200).send({ status: 1, data: data })
}
// const GetInforUser = async (req, res) => {

//     let id = req.params.id

//     const data = await Acount.findOne({ where: { account_id: id } })

//     res.status(200).send(data)

// }

module.exports = { UpdatePartner, addPartner, deletePartner, getAllPartner, getAlltype_suppliers, deleteSuppliers, addSuppliers, getAllSuppliers, updateSuppliers }