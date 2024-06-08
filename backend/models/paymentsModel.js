module.exports = (sequelize, DataTypes) => {

    const Payments = sequelize.define("payments", {
        payment_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        idexpenses: {
            type: DataTypes.STRING,
        },
        type_pay: {
            type: DataTypes.STRING,
        },
        Img: {
            type: DataTypes.STRING,
        },

        status
            : {
            type: DataTypes.INTEGER
        },
        approved_by
            : {
            type: DataTypes.INTEGER
        },

        account_id
            : {
            type: DataTypes.INTEGER
        },
        account_id_update
            : {
            type: DataTypes.INTEGER
        },

        Pay_date: {
            type: DataTypes.DATE
        },
        idsuppliers: {
            type: DataTypes.INTEGER
        },
        amount: {
            type: DataTypes.BIGINT
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

    return Payments

}