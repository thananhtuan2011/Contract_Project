module.exports = (sequelize, DataTypes) => {

    const Collection_category = sequelize.define("collection_categorys", {
        groupname: {
            type: DataTypes.STRING,
            allowNull: true
        },
        id_code: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        name_code: {
            type: DataTypes.STRING,
        },

        note
            : {
            type: DataTypes.STRING
        },


    },
        {

            // If don't want createdAt
            createdAt: false,

            // If don't want updatedAt
            updatedAt: false,
        })

    return Collection_category

}