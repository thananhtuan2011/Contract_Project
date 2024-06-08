const dbConfig = require('../config/dbConfig.js');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    dialectOptions: {
        encrypt: false,
        options: {
            useUTC: false, // for reading from database
        },
    },
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle

    },
    define: {
        freezeTableName: true
    },
}
)

sequelize.authenticate()
    .then(() => {
        console.log('connected..')
    })
    .catch(err => {
        console.log('Error' + err)
    })

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize
db.debts = require('./debtsModel.js')(sequelize, DataTypes)
db.plan_thus = require('./plan_thuModel.js')(sequelize, DataTypes)
db.plan_chis = require('./plan_chiModel.js')(sequelize, DataTypes)
db.debt_bills = require('./debt_bilslModel.js')(sequelize, DataTypes)
db.payments = require('./paymentsModel.js')(sequelize, DataTypes)
db.bills = require('./BillsModel.js')(sequelize, DataTypes)
db.expenses = require('./expensesModel.js')(sequelize, DataTypes)
db.plans = require('./plansModel.js')(sequelize, DataTypes)
db.collection_categorys = require('./collection_cateModel.js')(sequelize, DataTypes)
db.status = require('./statusModel.js')(sequelize, DataTypes)
db.contracts = require('./contractsModel.js')(sequelize, DataTypes)
db.type_customers = require('./type_customerModel.js')(sequelize, DataTypes)
db.type_suppliers = require('./type_suppliersModel.js')(sequelize, DataTypes)
db.levels = require('./levelsModel.js')(sequelize, DataTypes)
db.suppliers = require('./nccModel.js')(sequelize, DataTypes)
db.customers = require('./customerModel.js')(sequelize, DataTypes)
db.permisson_group = require('./permisson_groupModel.js')(sequelize, DataTypes)
db.accounts = require('./accountModel.js')(sequelize, DataTypes)
db.role = require('./RolesModel.js')(sequelize, DataTypes)
db.departments = require('./departmenModel.js')(sequelize, DataTypes)
db.menu = require('./menuModel.js')(sequelize, DataTypes)
db.permission_users = require('./permission_userModel.js')(sequelize, DataTypes)
db.permissions = require('./permissonModel.js')(sequelize, DataTypes)

db.sub_menu = require('./SubmenuModel.js')(sequelize, DataTypes)
db.sequelize.sync({ force: false })
    .then(() => {
        console.log('yes re-sync done!')
    })

db.accounts.hasMany(db.plan_thus, {
    foreignKey: 'account_id',
    as: 'plan_thus'

})
db.plan_thus.belongsTo(db.accounts, {
    foreignKey: 'account_id',
    as: 'accounts'
})

db.plan_thus.belongsTo(db.accounts, {
    foreignKey: 'account_id_update',
    as: 'accounts_up'
})

db.customers.hasMany(db.plan_thus, {
    foreignKey: 'customer_id',
    as: 'plan_thus'

})
db.plan_thus.belongsTo(db.customers, {
    foreignKey: 'customer_id',
    as: 'customers'
})



db.accounts.hasMany(db.debts, {
    foreignKey: 'account_id',
    as: 'debts'

})
db.debts.belongsTo(db.accounts, {
    foreignKey: 'account_id',
    as: 'accounts'
})
db.contracts.hasMany(db.debts, {
    foreignKey: 'contract_id',
    as: 'debts'

})
db.debts.belongsTo(db.contracts, {
    foreignKey: 'contract_id',
    as: 'contracts'
})

db.customers.hasMany(db.debts, {
    foreignKey: 'customer_id',
    as: 'debts'

})
db.debts.belongsTo(db.customers, {
    foreignKey: 'customer_id',
    as: 'customers'
})

db.accounts.hasMany(db.plan_chis, {
    foreignKey: 'account_id',
    as: 'plan_chis'

})
db.plan_chis.belongsTo(db.accounts, {
    foreignKey: 'account_id',
    as: 'accounts'
})
db.plan_chis.belongsTo(db.accounts, {
    foreignKey: 'account_id_update',
    as: 'accounts_up'
})



db.suppliers.hasMany(db.plan_chis, {
    foreignKey: 'idsuppliers',
    as: 'plan_chis'

})
db.plan_chis.belongsTo(db.suppliers, {
    foreignKey: 'idsuppliers',
    as: 'suppliers'
})
// ----
db.accounts.hasMany(db.debt_bills, {
    foreignKey: 'account_id',
    as: 'debt_bills'

})
db.debt_bills.belongsTo(db.accounts, {
    foreignKey: 'account_id',
    as: 'accounts'
})
db.contracts.hasMany(db.debt_bills, {
    foreignKey: 'contract_id',
    as: 'debt_bills'

})
db.debt_bills.belongsTo(db.contracts, {
    foreignKey: 'contract_id',
    as: 'contracts'
})

db.customers.hasMany(db.debt_bills, {
    foreignKey: 'customer_id',
    as: 'debt_bills'

})
db.debt_bills.belongsTo(db.customers, {
    foreignKey: 'customer_id',
    as: 'customers'
})


db.accounts.hasMany(db.bills, {
    foreignKey: 'account_id',
    as: 'bills'

})
db.bills.belongsTo(db.accounts, {
    foreignKey: 'account_id',
    as: 'accounts'
})
db.bills.belongsTo(db.accounts, {
    foreignKey: 'account_id_update',
    as: 'accounts_up_bill'
})
db.accounts.hasMany(db.payments, {
    foreignKey: 'approved_by',
    as: 'payments2'
})
db.payments.belongsTo(db.accounts, {
    foreignKey: 'account_id',
    as: 'accounts2'
})

db.payments.belongsTo(db.accounts, {
    foreignKey: 'account_id_update',
    as: 'account_up'
})

db.accounts.hasMany(db.payments, {
    foreignKey: 'account_id',
    as: 'payments'
})
db.payments.belongsTo(db.accounts, {
    foreignKey: 'account_id',
    as: 'accounts'
})

db.expenses.hasMany(db.payments, {
    foreignKey: 'idexpenses',
    as: 'payments'
})
db.payments.belongsTo(db.expenses, {
    foreignKey: 'idexpenses',
    as: 'expenses'
})

db.suppliers.hasMany(db.payments, {
    foreignKey: 'idsuppliers',
    as: 'payments'
})
db.payments.belongsTo(db.suppliers, {
    foreignKey: 'idsuppliers',
    as: 'suppliers'
})




db.customers.hasMany(db.bills, {
    foreignKey: 'customer_id',
    as: 'bills'
})
db.bills.belongsTo(db.customers, {
    foreignKey: 'customer_id',
    as: 'customers'
})


db.accounts.hasMany(db.bills, {
    foreignKey: 'account_id',
    as: 'bills_by'
})
db.bills.belongsTo(db.accounts, {
    foreignKey: 'account_id',
    as: 'bills_by'
})


db.accounts.hasMany(db.plans, {
    foreignKey: 'account_id',
    as: 'plans'
})
db.plans.belongsTo(db.accounts, {
    foreignKey: 'account_id',
    as: 'accounts'
})


db.status.hasMany(db.plans, {
    foreignKey: 'status_id',
    as: 'plans'
})
db.plans.belongsTo(db.status, {
    foreignKey: 'status_id',
    as: 'status'
})


db.contracts.hasMany(db.plans, {
    foreignKey: 'contract_id',
    as: 'plans'
})
db.plans.belongsTo(db.contracts, {
    foreignKey: 'contract_id',
    as: 'contracts'
})


// 1 to Many Relation cần 2 cái này để dùng incline 
// menu submenu
db.menu.hasMany(db.sub_menu, {
    foreignKey: 'id_menu',
    as: 'sub_menu'
})
db.sub_menu.belongsTo(db.menu, {
    foreignKey: 'id_menu',
    as: 'menu'
})

db.suppliers.hasMany(db.customers, {
    foreignKey: 'idsuppliers',
    as: 'customers'
})
db.customers.belongsTo(db.suppliers, {
    foreignKey: 'idsuppliers',
    as: 'suppliers'
})



db.accounts.hasMany(db.suppliers, {
    foreignKey: 'account_id',
    as: 'suppliers'
})
db.suppliers.belongsTo(db.accounts, {
    foreignKey: 'account_id',
    as: 'accounts'
})
db.suppliers.belongsTo(db.accounts, {
    foreignKey: 'account_id_update',
    as: 'accounts_up'
})

db.accounts.hasMany(db.contracts, {
    foreignKey: 'account_id',
    as: 'contracts'
})
db.contracts.belongsTo(db.accounts, {
    foreignKey: 'account_id',
    as: 'accounts'
})



db.status.hasMany(db.contracts, {
    foreignKey: 'status_id',
    as: 'contracts'
})
db.contracts.belongsTo(db.status, {
    foreignKey: 'status_id',
    as: 'status'
})


db.type_suppliers.hasMany(db.contracts, {
    foreignKey: 'idtype_suppliers',
    as: 'contracts'
})
db.contracts.belongsTo(db.type_suppliers, {
    foreignKey: 'idtype_suppliers',
    as: 'type_suppliers'
})




db.accounts.hasMany(db.customers, {
    foreignKey: 'account_id',
    as: 'customers'
})
db.customers.belongsTo(db.accounts, {
    foreignKey: 'account_id',
    as: 'accounts'
})
db.customers.belongsTo(db.accounts, {
    foreignKey: 'account_id_update',
    as: 'accounts_up'
})
db.type_customers.hasMany(db.customers, {
    foreignKey: 'idtype_customers',
    as: 'customers'
})
db.customers.belongsTo(db.type_customers, {
    foreignKey: 'idtype_customers',
    as: 'type_customers'
})
db.type_suppliers.hasMany(db.suppliers, {
    foreignKey: 'idtype_suppliers',
    as: 'suppliers'
})
db.suppliers.belongsTo(db.type_suppliers, {
    foreignKey: 'idtype_suppliers',
    as: 'type_suppliers'
})
db.levels.hasMany(db.suppliers, {
    foreignKey: 'id_level',
    as: 'suppliers'
})
db.suppliers.belongsTo(db.levels, {
    foreignKey: 'id_level',
    as: 'levels'
})

db.levels.hasMany(db.customers, {
    foreignKey: 'id_level',
    as: 'customers'
})
db.customers.belongsTo(db.levels, {
    foreignKey: 'id_level',
    as: 'levels'
})

// nhân viên phòng ban
db.departments.hasMany(db.accounts, {
    foreignKey: 'department_id',
    as: 'accounts'
})
db.accounts.belongsTo(db.departments, {
    foreignKey: 'department_id',
    as: 'departments'
})
// user với quyền
db.accounts.hasOne(db.permission_users, {
    foreignKey: 'account_id',
    as: 'permission_users'
})
db.permission_users.belongsTo(db.accounts, {
    foreignKey: 'account_id',
    as: 'accounts'
})
// phân quyền


db.permisson_group.hasMany(db.permissions, {
    foreignKey: 'permission_id',
    as: 'permissions'
})
db.permissions.belongsTo(db.permisson_group, {
    foreignKey: 'permission_id',
    as: 'permisson_group'
})


db.permisson_group.hasMany(db.permission_users, {
    foreignKey: 'permiss_group',
    as: 'permission_users'
})
db.permission_users.belongsTo(db.permisson_group, {
    foreignKey: 'permiss_group',
    as: 'permisson_group'
})

// roles with permsison
db.permissions.hasMany(db.role, {
    foreignKey: 'role_id',
    as: 'role'
})
db.role.belongsTo(db.permissions, {
    foreignKey: 'role_id',
    as: 'permissions'
})



module.exports = db
