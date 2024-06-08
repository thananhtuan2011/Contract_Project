module.exports = (sequelize, DataTypes) => {

    const Menu = sequelize.define("menu", {
        id_menu: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name_menu: {
            type: DataTypes.STRING
        },
        icon:
        {
            type: DataTypes.STRING
        },
        page:
        {
            type: DataTypes.STRING
        },
        roles:
        {
            type: DataTypes.INTEGER
        }


    })

    return Menu

}