module.exports = (sequelize, DataTypes) => {

    const Role = sequelize.define("role", {
        role_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        roleName: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.INTEGER
        },

    }
        ,
        {

            // If don't want createdAt
            createdAt: false,

            // If don't want updatedAt
            updatedAt: false,
        })


    return Role

}