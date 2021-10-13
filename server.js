const express = require('express')//  create the server
const articleRouter = require('./routes/articles')
const app = express()// call express within the app variable

app.set('view engine', 'ejs')

app.use('/articles', articleRouter)

app.get('/', (req, res) => {
    const articles = [{
        title: 'Test Article',
        createdAt: new Date(),
        description: 'Test description'
    },
    {
        title: 'Test Article 2',
        createdAt: new Date(),
        description: 'Test description'
    }]
    res.render('articles/index', { articles:articles })
})


app.listen(5000)// choose the server port to be used