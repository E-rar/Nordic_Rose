const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//const {Schema}=mongoose

const blogSchema = new Schema({
    id: {
        type: Number,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    published_at:{
        type: String,
        required:true,
    },
    duration:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        required:true,
    },
    author_bild:{
        type:String,
        required:true,
    }

}, { timestamps: true })

// Model based on the Schema
//=> pluralize : GalleryDb => GalleryDbs
const blog = mongoose.model('nordicRoseDB', blogSchema)

module.exports = blog