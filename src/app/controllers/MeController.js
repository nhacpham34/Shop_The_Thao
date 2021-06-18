const Product = require('../models/ProductModel');
const { mutipleMongooseToObject } = require('../until/mongoose')
class ProductController {
    // [GET] /me/stored/products 
    storedProducts(req, res, next) {

        let productQuery  = Product.find({});

        if (req.query.hasOwnProperty('_sort')) {
            productQuery = productQuery.sort({
                [req.query.column] : req.query.type
            });
        }

        Promise.all([productQuery,Product.countDocumentsDeleted()])
            .then(([products, deleteCount]) => {
                res.render('me/stored-products', {
                    deleteCount,
                    products : mutipleMongooseToObject(products) 
                }) 
            })
            .catch(next)
    }    

    trashProducts(req, res, next) {
        Product.findDeleted({})
            .then(products =>{
                res.render('me/trash-products', {
                    products : mutipleMongooseToObject(products) 
                }) 
            })
            .catch(next)
    }    
}

module.exports = new ProductController();
