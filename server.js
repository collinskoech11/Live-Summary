const express = require('express')//  create the server
const articleRouter = require('./routes/articles')
const app = express()// call express within the app variable

app.set('view engine', 'ejs')

app.use('/articles', articleRouter)

app.get('/', (req, res) => {
    const articles = [{
        title: 'Test Article',
        createdAt: Date.now(),
        description: 'Test description'
    }]
    res.render('index', { articles:articles })
})


app.listen(5000)// choose the server port to be used