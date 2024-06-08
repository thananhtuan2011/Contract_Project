// Mã secretKey này phải được bảo mật tuyệt đối, các bạn có thể lưu vào biến môi trường hoặc file
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "access-token-secret-example-quanghungdev.com-green-cat-a@";
const jwtHelper = require("../helpers/jwt.helper");
const db = require('../models')
const Submenu = db.sub_menu
const Menu = db.menu
const PermissGroup = db.permisson_group
const PermissUer = db.permission_users
const Permiss = db.permissions
const _getMenu = async (req, res) => {
    try {
        const tokenFromClient = req.body.token || req.query.token || req.headers["x-access-token"];

        // Nếu tồn tại token

        // Thực hiện giải mã token xem có hợp lệ hay không?
        const decoded = await jwtHelper.verifyToken(tokenFromClient, accessTokenSecret);

        // Nếu token hợp lệ, lưu thông tin giải mã được vào đối tượng req, dùng cho các xử lý ở phía sau.
        var listRoles = [];
        let per = await PermissUer.findAll({
            where: { account_id: decoded._id },
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
        // console.log("ffffff", per)
        // console.log("permisson_group", per.permisson_group)
        per[0].permisson_group.permissions.forEach(element => {
            listRoles.push(element.role_id)
        });


        let response = await Menu.findAll({
            where: { roles: listRoles },
            include: [{
                model: Submenu,
                as: 'sub_menu'
            }],
        })
        res.status(200).send(response)
    } catch (error) {
        return res.status(404).json({ message: error })
    }
}


module.exports = { _getMenu }