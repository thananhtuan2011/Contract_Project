module.exports = (sequelize, DataTypes) => {

    const Suppliers = sequelize.define("suppliers", {
        idsuppliers: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        supplieName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email
            : {
            type: DataTypes.STRING
        },
        phone: {
            type: DataTypes.STRING
        },
        address: {
            type: DataTypes.STRING
        },
        idtype_suppliers: {
            type: DataTypes.INTEGER
        },
        id_level: {
            type: DataTypes.INTEGER
        },
        account_id: {
            type: DataTypes.INTEGER
        },
        account_id_update: {
            type: DataTypes.INTEGER
        },

        updatedAt: {
            type: DataTypes.DATE
        },
        createdAt: {
            type: DataTypes.DATE
        },

    },
        {

            // If don't want createdAt
            createdAt: false,

            // If don't want updatedAt
            updatedAt: false,
        })

    return Suppliers

}