module.exports = (sequelize, DataTypes) => {

    const Permission_users = sequelize.define("permission_users", {
        permiss_group: {
            type: DataTypes.INTEGER,

        },
        account_id: {
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

    return Permission_users

}