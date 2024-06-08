module.exports = (sequelize, DataTypes) => {

    const Plan_thus = sequelize.define("plan_thus", {
        idplan_: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },


        id_code: {
            type: DataTypes.STRING
        },
        account_id_update: {
            type: DataTypes.STRING
        },

        pay: {
            type: DataTypes.BIGINT
        },
        pay_date: {
            type: DataTypes.DATE
        },

        account_id: {
            type: DataTypes.INTEGER
        },
        customer_id: {
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

    return Plan_thus

}