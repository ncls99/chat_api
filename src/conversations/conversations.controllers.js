const uuid = require('uuid')
const Conversations = require("../models/conversations.model");
const Participants = require('../models/participants.models');
const Users = require('../models/users.model');

const findAllConversations = async () => {
    const data = await Conversations.findAll({
        include: {
            model: Participants,
            include: {
                model: Users
            }
        }
    })
    return data
}

const findConversationById = async (id) => {
    const data = await Conversations.findOne({
        where: {
            id: id
        },
        include: {
            model: Participants,
            include: {
                model: Users
            }
        }
    })
    return data
}

const createConversations = async (obj) => {
    const newConversation = await Conversations.create({
        id: uuid.v4(),
        title: obj.title,
        imgUrl: obj.imgUrl,
        userId: obj.ownerId,

    })
    const participant1 = await Participants.create({
        id: uuid.v4(),
        userId: obj.ownerId,
        conversationId: newConversation.id
    })
    const participant2 = await Participants.create({
        id: uuid.v4(),
        userId: obj.participantId,
        conversationId: newConversation.id
    })
    return {
        newConversation, participant1, participant2
    }
}

const updateConversation = async (id, obj) => {
    const data = await Conversations.update(obj, {
        where: {
            id: id
        }
    })
    return data[0]
}

const deleteConversation = async (id) => {
    const data = await Conversations.destroy({
        where: {
            id: id
        }
    })
    return data
}

// createConversation({
//     tittle: 'Conversation Nicolás - Juan',
//     ownerId: '2d33d345-fb90-456e-924d-6d9ac0848d3a',
//     participantId: '8c6fa8a3-d3b0-4ac4-a3b8-7517cb5052da'
// })

// .then(data => console.log(data))
// .catch(err => console.log(err))

module.exports = {
    findAllConversations,
    createConversations,
    updateConversation,
    deleteConversation,
    findConversationById
    
}