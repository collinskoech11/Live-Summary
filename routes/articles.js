const express = require('express')
const Article = require('./../models/article')
const router = express.Router()
const app = express()
//route declarations 
router.use(express.static(__dirname + '../../static'))
router.get('/new', (req, res) => {
    res.render('articles/new', { article: new Article() })
})

router.get('/edit/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)
    res.render('articles/edit', { article: article })
})

router.get('/:slug', async (req, res) => {//use slug for page to generate access link
    const article = await Article.findOne({slug: req.params.slug})//get individual slug in stead of array
    if (article == null) res.redirect('/')
    res.render('articles/show', { article: article })
})
router.post('/', async  (req, res, next) => {
    req.article = new Article() 
}, saveArticleAndRedirect(`new`))
//nethod overriding to implement delete function
router.put('/:id', (req,res) => {

})
router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})
function saveArticleAndRedirect(path) {
    return async  (req, res) => {
        let article = req.article
            title: req.body.title
            description: req.body.description
            markdown: req.body.markdown
        try{
            article = await article.save()
            res.redirect(`/articles/${article.slug}`)
        } catch (e){
            console.log(e)
            res.render(`articles/${path}`, { article: article })
        }
    }
}
module.exports = router