module.exports = (sequelize, DataTypes) => {

    const Permisson_groups = sequelize.define("permisson_group", {
        permiss_group: {
            type: DataTypes.INTEGER,
            primaryKey: true,

        },
        permission_id: {
            type: DataTypes.INTEGER,

        },
        GroupName: {
            type: DataTypes.STRING,

        },


    },
        {

            // If don't want createdAt
            createdAt: false,

            // If don't want updatedAt
            updatedAt: false,
        })

    return Permisson_groups

}