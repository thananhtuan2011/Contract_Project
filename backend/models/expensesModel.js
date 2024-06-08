module.exports = (sequelize, DataTypes) => {

    const Expenses = sequelize.define("expenses", {
        idexpenses: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        group_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        type: {
            type: DataTypes.STRING,
        },

        name_expenses
            : {
            type: DataTypes.STRING
        },
        note
            : {
            type: DataTypes.STRING
        },


    },
        {

            // If don't want createdAt
            createdAt: false,

            // If don't want updatedAt
            updatedAt: false,
        })

    return Expenses

}