module.exports = (sequelize, DataTypes) => {

    const Type_customers = sequelize.define("type_customers", {
        idtype_customers: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type_name: {
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


    return Type_customers

}