const userControllers = require('./users.controllers')

const getAllUsers = (req, res) => {
    userControllers.findAllUsers()
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(400).json({ message: err.message })
        })
}

const getUserById = (req, res) => {
    const id = req.params.id
    userControllers.findUserById(id)
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

const getMyUser = (req, res) => {
    const id = req.user.id
    userControllers.findUserById(id)
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(400).json({ message: err.message })
        })
}

const postUser = (req, res) => {
    const { firstName, lastName, email, password, gender, birthday } = req.body
    userControllers.createUser({ firstName, lastName, email, password, gender, birthday })
        .then((data) => {
            res.status(201).json({ data })
        })
        .catch((err) => {
            res.status(400).json({
                message: err.message, fields: {
                    firstName: 'String',
                    lastName: 'String',
                    email: 'example@example.com',
                    password: 'String',
                    gender: 'String',
                    birthday: 'YYYY/MM/DD'
                }
            })
        })
}

const patchUser = (req, res) => {
    const id = req.params.id
    const { firstName, lastName, email, gender, birthday, role, status } = req.body
    userControllers.updateUser(id, { firstName, lastName, email, gender, birthday, role, status })
        .then((data) => {
            if (data) {
                res.status(200).json({ message: 'User edited succesfully' })
            } else {
                res.status(404).json({ message: 'User not found' })
            }
        })
        .catch((err) => {
            res.status(400).json({ message: err.message })
        })
}

const patchMyUser = (req, res) => {
    const id = req.user.id
    const { firstName, lastName, gender, birthday } = req.body

    userControllers.updateUser(id, { firstName, lastName, gender, birthday })
        .then(() => {
            res.status(200).json({ message: 'Your user was edites succesfully' })
        })
        .catch((err) => {
            res.status(400).json({ message: err.message })
        })
}

const deleteUser = (req, res) => {
    const id = req.params.id
    userControllers.deleteUser(id)
        .then((data) => {
            if (data) {
                res.status(204).json()
            } else {
                res.status(404).json({ message: 'User not found' })
            }
        })
        .catch((err) => {
            res.status(400).json({ message: err.message })
        })
}

const deleteMyUser = (req, res) => {
    const id = req.user.id
    userControllers.deleteUser(id)
        .then(() => {
            res.status(204).json()
        })
        .catch((err) => {
            res.status(400).json({ message: err.message })
        })
}

module.exports = {
    getAllUsers,
    getUserById,
    getMyUser,
    postUser,
    patchUser,
    patchMyUser,
    deleteUser, 
    deleteMyUser
}