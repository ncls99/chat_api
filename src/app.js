const express = require('express')
const cors = require('cors')

const config = require('../config')
const db = require('./utils/database')
const initModels = require('./models/initModels')
const userRouter = require('./users/users.router')
const authRouter = require('./auth/auth.router')

const app = express()
app.use(express.json())
app.use(cors())

db.authenticate()
    .then(() => console.log('Database aunthenticaded c:'))
    .catch((err) => console.log(err))

db.sync()
    .then(() => console.log('Database synced c:'))
    .catch((err) => console.log(err))

initModels()

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Todo Ok!',
        routes: {
            users: ""
        }
    })
})

app.use('/api/v1/users', userRouter)
app.use('/api/v1/auth', authRouter)

app.listen(config.api.port, () => {
    console.log(`Server started on ${config.api.host}`)
})

