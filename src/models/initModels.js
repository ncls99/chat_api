const Users = require('./users.model')
const RecoveryPasswords = require('./recoveryPassword.model')

const initModels = () => {
    Users.hasMany(RecoveryPasswords)
    RecoveryPasswords.belongsTo(Users)
}

module.exports = initModels 