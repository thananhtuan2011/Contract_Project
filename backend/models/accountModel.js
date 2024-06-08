module.exports = (sequelize, DataTypes) => {

    const Accounts = sequelize.define("accounts", {
        account_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role_deparment
            : {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        fullname: {
            type: DataTypes.STRING
        },
        avatar: {
            type: DataTypes.STRING
        },

        email: {
            type: DataTypes.STRING
        },
        phone: {
            type: DataTypes.STRING
        },
        department_id: {
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

    return Accounts

}