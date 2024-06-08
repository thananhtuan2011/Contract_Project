module.exports = (sequelize, DataTypes) => {

    const Permissions = sequelize.define("permissions", {
        permission_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,

        },
        role_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },


    },
        {

            // If don't want createdAt
            createdAt: false,

            // If don't want updatedAt
            updatedAt: false,
        })

    return Permissions

}