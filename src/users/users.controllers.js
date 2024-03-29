const uuid = require('uuid')
const Users = require('../models/users.model')
const { hashPassword } = require('../utils/crypto')

const findAllUsers = async () => {
    const data = await Users.findAll({
        attributes: {
            exclude: ['password', 'email', 'createdAt', 'updatedAt', 'role'],
            where: {
                status: 'active'
            }
        }
    })
    return data
}


const findUserById = async (id) => {
    const data = await Users.findOne({
        attributes:{
            exclude: ['password', 'createdAt', 'updatedAt']
        },
        where: {
            id: id
        }
    })
    return data
}

const findUserByEmail = async (email) => {
    const data = await Users.findOne({
        where: {
            email: email
        }
    })
    return data
}

const createUser = async (obj) =>{
    console.log(obj.password)
    const data = await Users.create({
        id: uuid.v4(),
        firstName: obj.firstName,
        lastName: obj.lastName,
        email: obj.email,
        password: hashPassword(obj.password),
        gender: obj.gender,
        birthday: obj.birthday

    })
    return data
    console.log(data)
}

const updateUser = async (id, obj) => {
    const data = await Users.update(obj, {
        where: {
            id: id
        }
    })
    return data[0]
}

const deleteUser = async (id) => {
    const data = await Users.update({
        status: 'inactive'
    }, {
        where: {
            id: id
        }
    })
    return data[0]
}

module.exports = {
    findAllUsers,
    findUserByEmail,
    findUserById,
    createUser,
    updateUser,
    deleteUser
}
