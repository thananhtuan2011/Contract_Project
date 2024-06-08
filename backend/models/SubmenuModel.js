module.exports = (sequelize, DataTypes) => {

    const Submenu = sequelize.define("sub_menu", {
        idsub_menu: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name_submenu: {
            type: DataTypes.STRING
        },
        id_menu: {
            type: DataTypes.INTEGER
        },
        page:
        {
            type: DataTypes.STRING
        }
    })

    return Submenu

}