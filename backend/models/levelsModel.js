module.exports = (sequelize, DataTypes) => {

    const Levels = sequelize.define("levels", {
        id_level: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name_level: {
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


    return Levels

}