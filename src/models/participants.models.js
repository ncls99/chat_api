const {DataTypes} = require('sequelize')
const db = require('../utils/database')
const Conversations = require('./conversations.model')
const Users = require('./users.model')


const Participants = db.define('participants',{
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            key: 'id',
            model: Users
        }
    },
    conversationId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            key: 'id',
            model: Conversations
        }
    }
})

module.exports = Participants