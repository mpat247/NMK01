//React server (client) --> not needed in production
//Node server (server) --> needed in production

//How to write express server
const express = require("express")
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const jwt = require('jsonwebtoken')

app.use(cors())
app.use(express.json())

// mongoose.connect('mongodb+srv://dhruvi:biasaware@biasaware.ipjjs0e.mongodb.net/')
mongoose.connect('mongodb+srv://dhruvi24patell:dhruvi24patell@full-mern-stack.myi3k2o.mongodb.net/')

app.get('/', async (req, res) => {
    res.json('Hello')
})

app.post('/api/register', async (req, res) => {
    console.log(req.body)
    try {
            await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
        res.json({ status: 'ok' })
    } catch (err) {
        // console.log(err)
        res.json({ status: 'error', error: 'Duplicate email' })
    }
})

app.post('/api/login', async (req, res) => {
    const user = await User.findOne({
        email: req.body.email, 
        password: req.body.password
    })

    //Authentication token
    if (user){
        const token = jwt.sign(
            {
                name: user.name,
                email: user.email,
            }, 
            'secret123'
        )

        return res.json({ status: 'ok', user: token})
    } else {
        return res.json({ status: 'error', user: false})
    }
})

app.listen(1337, () => {
    console.log("Server started on 1337")

})