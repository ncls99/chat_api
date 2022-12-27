const router = require('express').Router()
const messageServices = require('../messages/messages.services')
const conversationServices = require('./conversations.services')
const passportJWT = require('../middlewares/auth.middleware')
const participantValidate = require('../middlewares/participantValidate.middleware')
// const {paticipantValidate} = require('../middlewares/participantValidate.middleware')


router.route('/')
    .get(passportJWT.authenticate('jwt', { session: false }), conversationServices.getAllConversations)
    .post(passportJWT.authenticate('jwt', { session: false }), conversationServices.postConversation)

router.route('/:conversation_id')
    .get(passportJWT.authenticate('jwt', { session: false }), conversationServices.getConversationById)
    .patch(passportJWT.authenticate('jwt', {session: false}), conversationServices.patchConversation)
    .delete(passportJWT.authenticate('jwt', {session: false}), conversationServices.deleteConversation)

router.route('/:conversation_id/message')
    .post(passportJWT.authenticate('jwt', {session: false}), participantValidate, messageServices.postMessage)

module.exports = router