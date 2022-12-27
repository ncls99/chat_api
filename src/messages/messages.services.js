const messageControlers = require('./messages.controllers')

const getAllMessages = (req, res) => {
    const conversationId = req.params.conversation_id
    messageControlers.findAllMessages(conversationId)
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(400).json({ message: err.message })
        })
}

const getMessageById = (req, res) => {
    const id = req.params.message_id
    messageControlers.findMesasagesById(id)
    .then((data) => {
        if (data) {
            res.status(200).json(data)
        } else {
            res.status(404).json({ message: 'invalid ID' })
        }
    })
    .catch((err) => {
        res.status(400).json({ message: err.message })
    })
        
}

const postMessage = (req, res) => {
    const userId = req.user.id
    const conversationId = req.params.conversation_id
    const { message } = req.body

    messageControlers.createMessage({ userId, conversationId, message })
        .then((data) => {
            res.status(201).json(data)
        })
        .catch((err) => {
            res.status(400).json({
                message: err.message, fields: {
                    message: 'string'
                }
            })
        })
}

const deleteMessage = (req, res) => {
    const id = req.params.message_id
    messageControlers.deleteMessage(id)
        .then((data) => {
            if (data) {
                res.status(204).json({ message: 'message deleted succesfully' })
            } else {
                res.status(404).json({ message: 'Invalid ID' })
            }
        })
        .catch((err) => {
            res.status(400).json({ message: err.message })
        })
}

module.exports = {
    postMessage,
    getAllMessages,
    getMessageById,
    deleteMessage
}