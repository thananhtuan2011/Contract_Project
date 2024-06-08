module.exports = (sequelize, DataTypes) => {

    const Type_suppliers = sequelize.define("type_suppliers", {
        idtype_suppliers: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        account_id: {
            type: DataTypes.INTEGER,
        },

        type_name: {
            type: DataTypes.STRING
        },
        updatedAt: {
            type: DataTypes.DATE
        },
        createdAt: {
            type: DataTypes.DATE
        },

    }
        ,
        {

            // If don't want createdAt
            createdAt: false,

            // If don't want updatedAt
            updatedAt: false,
        })


    return Type_suppliers

}