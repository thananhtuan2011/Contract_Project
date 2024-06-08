
const db = require('../models')
// create main Model

const Acount = db.accounts
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Depart = db.departments
function isEmpty(object) {
    return Object.keys(object).length === 0
}
const updateAcount = async (req, res) => {

    let id = req.params.id
    await Acount.update(req.body, { where: { account_id: id } })
    let acountdata = await Acount.findOne({ attributes: ['account_id', 'department_id', 'avatar', 'username', 'fullname', 'role_deparment', 'email', 'phone'], where: { account_id: id } })
    res.status(200).send(acountdata)


}
const updateAcountPass = async (req, res) => {

    const check = await Acount.findAll({ where: { username: req.body.username, password: req.body.currentPassword } })
    if (check.length > 0) {

        let updatitem = {
            password: req.body.password
        }
        let id = req.params.id
        const dt = await Acount.update(updatitem, { where: { account_id: id } })

        res.status(200).send({ status: 1 })
    }
    else {
        res.status(200).send({ status: 0 })
    }


}

const updateAcountRoleDeparment = async (req, res) => {

    let id = req.params.id
    const dt = await Acount.update(req.body, { where: { account_id: id } })

    res.status(200).send(dt)


}
const GetAllReviewer = async (req, res) => {

    const dt = await Acount.findAll({
        attributes: ['account_id', 'department_id', 'username', 'fullname', 'role_deparment'], where: {

            [Op.or]: [{
                role_deparment:
                    "all"
            }
                , {
                role_deparment:
                    "admin"
            }

            ]
        }
    })

    res.status(200).send(dt)


}

const getAllAcount = async (req, res) => {
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
                    fullname: { [Op.like]: `%${req.body.filter.fullname}%` },
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
        const data = await Acount.findAndCountAll({
            where: query,
            ...queries,
            include: [{
                model: Depart,
                as: 'departments'
            }],
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
const addAcount = async (req, res) => {
    try {

        let date_ob = new Date();
        let info = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            fullname: req.body.fullname,
            phone: req.body.phone,
            department_id: req.body.department_id,
            createdAt: date_ob,
            updatedAt: null

        }

        const data = await Acount.create(info)
        res.status(200).send({ status: 1, data: data })
    }
    catch (error) {
        res.status(200).send({ status: 0, error: error })
    }

}
// 5. delete product by id

const deleteAccount = async (req, res) => {

    let id = req.params.id

    await Acount.destroy({ where: { account_id: id } })

    res.status(200).send({ status: 1 })

}

const GetInforUser = async (req, res) => {

    let id = req.params.id

    const data = await Acount.findOne({ where: { account_id: id } })

    res.status(200).send(data)

}

module.exports = { updateAcountPass, GetAllReviewer, deleteAccount, addAcount, getAllAcount, updateAcount, GetInforUser, updateAcountRoleDeparment }