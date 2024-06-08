module.exports = (sequelize, DataTypes) => {

    const Bills = sequelize.define("bills", {
        id_bill: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        type
            : {
            type: DataTypes.STRING
        },
        id_code
            : {
            type: DataTypes.STRING
        },
        Img
            : {
            type: DataTypes.STRING
        },
        customer_id
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
        Date_bill: {
            type: DataTypes.DATE
        },


        Total_amount: {
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

    return Bills

}