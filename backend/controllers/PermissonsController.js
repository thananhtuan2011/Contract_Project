const db = require('../models')
const PermissUer = db.permission_users
const Permiss = db.permissions
const Role = db.role
const PermissGroup = db.permisson_group

const getRolesUser = async (req, res) => {


    let id = req.params.id
    // let per = await PermissUer.findAll({
    //     where: { account_id: id },
    //     include: [{
    //         model: Permiss,
    //         as: 'permissions'
    //     }],
    // }
    let per = await PermissUer.findAll({
        where: { account_id: id },
        include: [{
            model: PermissGroup,
            as: 'permisson_group',

            include: [{
                model: Permiss,
                as: 'permissions'
            }],
        }],
    }
    )
    res.status(200).send(per)

}
const getPermissAll = async (req, res) => {

    let per = await Role.findAll({

    }
    )
    res.status(200).send(per)

}
const getPermissNotInGroup = async (req, res) => {
    let data = [];
    let id = req.params.id
    let per = await Permiss.findAll({
        where: { permission_id: id },

    }

    )


    let perole = await Role.findAll({

    })
    perole.forEach(element => {
        let index = per.findIndex(x => x.role_id == element.role_id)
        if (index < 0) {
            let tt = {
                permission_id: id,
                roleName: element.roleName,
                role_id: element.role_id,
                check: false
            }
            data.push(tt)
        }

    });
    res.status(200).send(data)

}
const getPermiss = async (req, res) => {
    let data = [];
    let id = req.params.id
    let per = await Permiss.findAll({
        where: { permission_id: id },

    }

    )


    let perole = await Role.findAll({

    })
    per.forEach(element => {
        let index = perole.findIndex(x => x.role_id == element.role_id)
        if (index >= 0) {
            let tt = {
                permission_id: element.permission_id,
                roleName: perole[index].roleName,
                role_id: element.role_id,
                check: true
            }
            data.push(tt)
        }

    });
    res.status(200).send(data)

}
module.exports = {
    getRolesUser, getPermiss, getPermissAll, getPermissNotInGroup
}