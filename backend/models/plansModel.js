module.exports = (sequelize, DataTypes) => {

    const Plans = sequelize.define("plans", {
        idPlan: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        reason
            : {
            type: DataTypes.STRING
        },
        type: {
            type: DataTypes.STRING
        },
        start_date: {
            type: DataTypes.DATE
        },
        end_date: {
            type: DataTypes.STRING
        },
        type_pay: {
            type: DataTypes.STRING
        },
        status_id: {
            type: DataTypes.INTEGER
        },
        account_id: {
            type: DataTypes.INTEGER
        },
        contract_id: {
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

    return Plans

}