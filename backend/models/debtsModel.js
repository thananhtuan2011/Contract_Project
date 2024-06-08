module.exports = (sequelize, DataTypes) => {

    const Debts = sequelize.define("debts", {
        iddebts: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        account_id: {
            type: DataTypes.INTEGER,
        },
        idDebt_bills: {
            type: DataTypes.INTEGER,
        },

        contract_id: {
            type: DataTypes.INTEGER,
        },
        customer_id: {
            type: DataTypes.INTEGER,
        },
        end_date: {
            type: DataTypes.DATE,
        },
        start_date: {
            type: DataTypes.DATE,
        },
        month: {
            type: DataTypes.STRING,
        },
        amount: {
            type: DataTypes.INTEGER,
        },

        pay_month: {
            type: DataTypes.INTEGER,
        },

        Debt_pay: {
            type: DataTypes.INTEGER,
        },
        Debt_amount: {
            type: DataTypes.INTEGER,
        },
        Note: {
            type: DataTypes.STRING,
        },
        type: {
            type: DataTypes.STRING,
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

    return Debts

}