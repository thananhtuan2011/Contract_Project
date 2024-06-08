const db = require('../models')
// create main Model
const Depart = db.departments
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

function isEmpty(object) {
    return Object.keys(object).length === 0
}
const getAllDepartment = async (req, res) => {
    try {
        let pageSizes = [];
        let limit = req.body.paginator.pageSize;
        let query = {}
        if (!isEmpty(req.body.filter)) {
            query = {
                departmentName: { [Op.like]: `%${req.body.filter.departmentName}%` },
            }

        }

        const queries = {
            offset: (req.body.paginator.page - 1) * limit,
            limit
        }

        // if (orderBy) {
        //     queries.order = [[orderBy, sortBy]]
        // }
        const data = await Depart.findAndCountAll({
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
const updateDepartment = async (req, res) => {

    let id = req.params.id
    const dt = await Depart.update(req.body, { where: { department_id: id } })

    res.status(200).send(dt)


}
const addDepartment = async (req, res) => {
    let date_ob = new Date();
    let info = {
        departmentName: req.body.departmentName,
        createdAt: date_ob,
        updatedAt: null,

    }

    const data = await Depart.create(info)
    res.status(200).send(data)


}
// 5. delete product by id

const deleteDepartment = async (req, res) => {

    try {

        let id = req.params.id

        await Depart.destroy({ where: { department_id: id } })

        res.status(200).send({ status: 1 })
    }
    catch (err) {
        res.status(200).send({ status: 0 })
    }

}

module.exports = { getAllDepartment, addDepartment, deleteDepartment, updateDepartment }