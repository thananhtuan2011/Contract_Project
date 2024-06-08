module.exports = (sequelize, DataTypes) => {

    const Contracts = sequelize.define("contracts", {
        contract_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        account_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        customer_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        account_id_reviewer: {
            type: DataTypes.INTEGER,
        },

        note
            : {
            type: DataTypes.STRING
        },
        contract_name
            : {
            type: DataTypes.STRING
        },

        idtype_suppliers: {
            type: DataTypes.INTEGER
        },
        status_id: {
            type: DataTypes.INTEGER
        },
        value_contract: {
            type: DataTypes.INTEGER
        },
        partner_name: {
            type: DataTypes.STRING
        },
        date_complete: {
            type: DataTypes.DATE
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

    return Contracts

}