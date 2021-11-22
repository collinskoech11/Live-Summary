const express = require('express')//  create the server
const mongoose = require('mongoose')
const Article = require('./models/article')
const methodOverride = require('method-override')
const articleRouter = require('./routes/articles')
const app = express()// call express within the app variable

mongoose.connect('mongodb://localhost/blog', {
    useNewUrlParser: true, useUnifiedTopology: true
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false}))
app.use(express.static(__dirname + '/static'))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
    const articles = await Article.find().sort({ createdAt: 'desc' })
    res.render('articles/index', { articles:articles })
})

app.get('/Read', async (req, res) => {
    const articles = await Article.find().sort({ createdAt: 'desc' })
    res.render('articles/Read', { articles:articles })
})
app.get('/Write', async (req, res) => {
    const articles = await Article.find().sort({ createdAt: 'desc' })
    res.render('articles/Write', { articles:articles })
})
app.use('/articles', articleRouter)

app.listen(5000)// choose the server port to be used
console.log('This app is rendering on port http://localhost:5000')