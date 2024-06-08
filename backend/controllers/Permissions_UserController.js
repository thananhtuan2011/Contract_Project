const db = require('../models')
const PermissUer = db.permission_users
const Permiss = db.permissions
const Depart = db.departments
const Acount = db.accounts
const Permiss_Group = db.permisson_group


const DeleteGroup = async (req, res) => {
    let id = req.params.id

    await Permiss_Group.destroy({
        where: {
            permiss_group: id
        }
    }
    )
    res.status(200).send({ status: 1 })

}
// const getPermiss_User = async (req, res) => {


//     let per = await PermissUer.findAll({

//         include: [{
//             model: Permiss,
//             as: 'permissions'
//         }],
//     }
//     )
//     res.status(200).send(per)

// }
const updateRolesPermis = async (req, res) => {

    await Permiss.destroy({
        where: {
            permission_id: req.body.permission_id
        }
    })

    req.body.listupdate.forEach(async element => {
        let info = {
            permission_id: element.permission_id,
            role_id: element.role_id,

        }

        await Permiss.create(info)
    });

    res.status(200).send({ status: 1 })


}
const addGroupRolesWithPermiss = async (req, res) => {
    let info = {
        GroupName: req.body.GroupName,


    }



    const data = await Permiss_Group.create(info);


    let item = {
        permission_id: data.null
    }
    await Permiss_Group.update(item, { where: { permiss_group: data.null } })
    console.log("resss", req.body)
    if (req.body.listRoles.length > 0) {
        req.body.listRoles.forEach(async element => {

            let prr = {
                permission_id: data.null,
                role_id: element.role_id
            }
            await Permiss.create(prr);
        });
    }
    res.status(200).send(data)


}
const addGroupAcountRoles = async (req, res) => {
    let info = {
        account_id: req.body.account_id,
        permiss_group: req.body.permiss_group,

    }
    const check = await PermissUer.findAll({ where: { account_id: req.body.account_id } })
    // đã tồn tại thì update lại cái group
    if (check.length > 0) {
        let hh =
        {
            permiss_group: req.body.permiss_group
        }


        const dt = await PermissUer.update(hh, { where: { account_id: req.body.account_id } })

        res.status(200).send(dt)
    }
    else {
        console.log("vào dâyd")
        await PermissUer.create(info)
        res.status(200).send({ status: 1 })

    }





}
const DeleteGroupRoles = async (req, res) => {
    let id = req.params.id
    await PermissUer.destroy({ where: { account_id: id } })
    res.status(200).send({ status: 1 })

}
function isEmpty(object) {
    return Object.keys(object).length === 0
}
// load dan danh sách nhóm quyền
const getPermiss_User = async (req, res) => {
    try {
        let pageSizes = [];
        let limit = req.body.paginator.pageSize;
        let query = {}

        if (!isEmpty(req.body.filter)) {
            query = {
                fullname: { [Op.like]: `%${req.body.filter.fullname}%` },
            }

        }
        console.log("queryquery", query)

        const queries = {
            offset: (req.body.paginator.page - 1) * limit,
            limit
        }

        // if (orderBy) {
        //     queries.order = [[orderBy, sortBy]]
        // }
        const data = await Permiss_Group.findAndCountAll({
            where: query,
            ...queries,

            // include: [{
            //     model: Permiss,
            //     as: 'permissions'
            // }],
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
const getPermiss_Bypermisson = async (req, res) => {
    try {
        let pageSizes = [];

        let id = req.params.id
        let limit = req.body.paginator.pageSize;
        let query = {}

        if (!isEmpty(req.body.filter)) {
            query = {

            }

        }
        console.log("queryquery", query)

        const queries = {
            offset: (req.body.paginator.page - 1) * limit,
            limit
        }

        // if (orderBy) {
        //     queries.order = [[orderBy, sortBy]]
        // }
        const data = await Permiss_Group.findAndCountAll({
            where: { permiss_group: id },
            ...queries,
            include: [{
                model: PermissUer,
                as: 'permission_users',
                include: [{
                    model: Acount,
                    as: 'accounts',
                    include: [{
                        model: Depart,
                        as: 'departments'
                    }],
                }


                ],
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

    }
    catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving tutorials."
        });
    }

}
const GetGroupPermiss = async (req, res) => {

    const data = await Permiss_Group.findAll()

    res.status(200).send(data)

}


const GetGroupRoleUser = async (req, res) => {

    let id = req.params.id

    let per = await PermissUer.findAll({
        where: { account_id: id },


    }
    )
    res.status(200).send(per)

}
module.exports = {
    updateRolesPermis, DeleteGroup, addGroupRolesWithPermiss, DeleteGroupRoles, addGroupAcountRoles, getPermiss_User, getPermiss_Bypermisson, GetGroupPermiss, GetGroupRoleUser,

}