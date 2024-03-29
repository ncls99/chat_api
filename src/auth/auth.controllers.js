const { findUserByEmail } = require('../users/users.controllers')
const { comparePassword } = require('../utils/crypto')
const uuid = require('uuid')


const checkUsersCredentials = async (email, password) => {
    try {
        const user = await findUserByEmail(email)
        const verifyPassword = comparePassword(password, user.password)
        if(verifyPassword){
            return user
        }
        return null
    } catch (error) {
        return null
    }
}

module.exports = 
    checkUsersCredentials