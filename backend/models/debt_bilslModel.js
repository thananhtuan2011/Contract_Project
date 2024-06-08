module.exports = (sequelize, DataTypes) => {

    const Debt_bills = sequelize.define("debt_bills", {
        idDebt_bills: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        account_id: {
            type: DataTypes.INTEGER,
        },
        contract_id: {
            type: DataTypes.INTEGER,
        },
        customer_id: {
            type: DataTypes.INTEGER,
        },
        Img: {
            type: DataTypes.STRING,
        },
        amount: {
            type: DataTypes.INTEGER,
        },

        date_debt: {
            type: DataTypes.DATE,
        },

        createdAt: {
            type: DataTypes.DATE,
        },
        updatedAt: {
            type: DataTypes.DATE,
        },


    },
        {

            // If don't want createdAt
            createdAt: false,

            // If don't want updatedAt
            updatedAt: false,
        })

    return Debt_bills

}