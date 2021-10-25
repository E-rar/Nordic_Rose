const express = require('express')
const app = express()
const mongoose = require('mongoose')
const blog = require('./models/blog.js')
require('dotenv').config()
const dbUri = `mongodb+srv://supercode:${process.env.MONGODB_PW}@supercode.fxgp9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
var cors = require('cors')
//====================MIDDLEWARES============================================
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const port = process.env.PORT||3000
app.use(cors())

//=====================BROWSE THE SERVER WITH MONGOOSE===========================

mongoose.connect(dbUri, () => {
    console.log('Database is connected')
    app.listen(port, () => {
        console.log(`listening at http://localhost:${port}`)
    })
})
//=====================REDIRECT===================================================
// app.get('/',(req,res)=>{
//     res.redirect('/add')
// })
//=====================ROUTING===================================================
app.get('/',(req,res)=>{
    blog.find()
    .then(results => {
        console.log(results)
        res.render('pages/index.ejs',{results})
    })
    .catch(err => console.log(err))
})
app.get('/detail/:id',(req,res)=>{
    blog.find()
    .then(results => {
        console.log(results)
        res.render('pages/detail.ejs',{results:results,content:results[req.params.id]}) //hier hab ich den content her 
    })
    .catch(err => console.log(err))
})
app.get('/add',(req,res)=>{
    blog.find()
    .then(results => {
        console.log(results)
        blog.find().count()
        .then(response=>{
            res.render('pages/add.ejs',{results,response})    
        })
        // res.render('pages/add.ejs',{results})
    })
    .catch(err => console.log(err))

})
//=====================CRUD======================================================
app.post('/new', (req, res) => { //POST METHOD
    console.log(req.body)
    let newblog = new blog(req.body)
    newblog.save()
        .then(result => res.redirect(`/add`))
        .catch(err => console.log(err))
})
