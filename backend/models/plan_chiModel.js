module.exports = (sequelize, DataTypes) => {

    const Plan_chis = sequelize.define("plan_chis", {
        idplan_: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },


        idexpenses: {
            type: DataTypes.STRING
        },
        pay: {
            type: DataTypes.INTEGER
        },
        pay_date: {
            type: DataTypes.DATE
        },
        account_id_update: {
            type: DataTypes.INTEGER
        },

        account_id: {
            type: DataTypes.INTEGER
        },
        idsuppliers: {
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

    return Plan_chis

}