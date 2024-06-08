module.exports = (sequelize, DataTypes) => {

    const Status = sequelize.define("status", {
        status_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        status_name: {
            type: DataTypes.STRING
        },
    }
        ,
        {

            // If don't want createdAt
            createdAt: false,

            // If don't want updatedAt
            updatedAt: false,
        })


    return Status

}