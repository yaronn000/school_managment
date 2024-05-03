require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const router = require('./routes/index')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(cookieParser());
app.use(express.json())
app.use('/api', router)

app.get('/', (req, res) => {
    res.status(200).json({message: 'Work'})
})

const start = async () => {
    try {
        await sequelize.authenticate()
        app.listen(PORT, () => console.log(`Serever started on port ${PORT}`))

    } catch (e) {
        console.log(e)
    }
} 

start()

