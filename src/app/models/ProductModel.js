// Using Node.js `require()`
const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');


const Schema = mongoose.Schema;

const Product = new Schema({
    name: {type: String,  require: true ,maxLength: 255},
    description: {type: String, maxLength:600},
    image: {type: String, maxLength:255},
    price: {type: String},
    type: {type: String},
    size: {type: String},
    slug: {type: String, slug: 'name' , unique:true},
},{timestamps: true});

mongoose.plugin(slug);
Product.plugin(mongooseDelete, { 
    overrideMethods: 'all' ,
    deletedAt : true
});

module.exports = mongoose.model('Product', Product); 