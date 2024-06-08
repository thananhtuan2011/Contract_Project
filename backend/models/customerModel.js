module.exports = (sequelize, DataTypes) => {

    const Customers = sequelize.define("customers", {
        customer_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        customerName: {
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
        idtype_customers: {
            type: DataTypes.INTEGER
        },
        id_level: {
            type: DataTypes.INTEGER
        },
        account_id: {
            type: DataTypes.INTEGER
        },
        idsuppliers: {
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

    return Customers

}