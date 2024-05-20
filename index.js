const express = require('express')
const User = require('./models/userSchema')
const connectDB = require("./db/connectDB")
const path = require('path')

const app = express()
connectDB()

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/create', async (req,res) => {
    const {username, email, image} = req.body
    console.log(username, email, image)
    const createdUser = await User.create({
        username,
        email,
        image
    })
    res.redirect('/')
})

app.get('/read', async (req,res) => {
    const result = await User.find()
    res.render('read', {result})
})

app.get('/delete/:username', async (req, res) => {
    const deleted = await User.findOneAndDelete({username : req.params.username})
    res.redirect('/read')
})

app.get('/edit/:id', async (req, res) => {
    const user = await User.findOne({_id : req.params.id})
    res.render("edit", {user})
})

app.post('/editUser/:id', async (req, res) => {
    console.log(req.body)
    await User.findOneAndUpdate({_id: req.params.id}, req.body)
    res.redirect('/read')
})

// app.get('/delete', async (req,res) => {
//     const superman = await User.findOneAndDelete({username : 'superman'})
//     res.send(superman)
// })

app.listen(3000, () => {
    console.log("Server started")
})