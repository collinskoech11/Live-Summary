const mongoose = require('mongoose')
const marked = require('marked')
const slugify = require('slugify')

const articleSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true
    },
    description: {
        type: String
    },
    markdown: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now 
    },
    slug: {
        type: String,
        required: true,
        unique: true
    }
})
articleSchema.pre('validate', function(next) {//Right before we perform validation of the article
    if (this.title) {
        this.slug = slugify(this.title, {lower: true, strict:true })//create slug from the article title 
    }

    next()
    
})

module.exports = mongoose.model('Article', articleSchema)