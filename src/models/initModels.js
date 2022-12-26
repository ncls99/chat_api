const Users = require('./users.model')
const RecoveryPasswords = require('./recoveryPassword.model')
const Conversations = require('./conversations.model')
const Messages = require('./messages.models')
const Participants = require('./participants.models')
 
const initModels = () => {
    Users.hasMany(RecoveryPasswords)
    RecoveryPasswords.belongsTo(Users)

    Users.hasMany(Messages)
    Messages.belongsTo(Users)

    Users.hasMany(Conversations)
    Conversations.belongsTo(Users)

    Users.hasMany(Participants)
    Participants.belongsTo(Users)

    Conversations.hasMany(Messages)
    Messages.belongsTo(Conversations)

    Conversations.hasMany(Participants)
    Participants.belongsTo(Conversations)
}

module.exports = initModels 