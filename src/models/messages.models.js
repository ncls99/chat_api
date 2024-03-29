const { DataTypes } = require("sequelize");
const db = require("../utils/database");
const Conversations = require("./conversations.model");
const Users = require("./users.model");

const Messages = db.define('messages', {
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
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    }
})

module.exports = Messages