const Product = require('../models/ProductModel');
const { mongooseToObject } = require('../until/mongoose')
class ProductController {
    // [GET] /products 
    index(req, res, next) {
        Product.find({type: "MEN"})
            .then(products => res.json(products))
            .catch(next)
    }

    // [GET] /products/create
    create(req, res, next) {
        res.render('product/create')
    }

    // [GET] /product/store
    store(req, res, next) {
        // res.json(req.body)
        const product = new Product(req.body)
        product.save()
            .then( () => res.redirect('/me/stored/products'))
            .catch(error => {

            })
    }

    // [GET] /products:slug
    show(req, res, next) {
        Product.findOne({slug : req.params.slug})
            .then(product => {
                res.render('product/show' , {
                    product: mongooseToObject(product) 
                });
            })
            .catch(next)
    }

    // [GET] /products/:id/edit
    edit(req, res, next) {
        Product.findById(req.params.id)
            .then(product => res.render('product/edit', {
                product : mongooseToObject(product)
            }))
            .catch(next)
        
    }

    // [PUT] /products/:id
    update(req, res, next) {
        Product.updateOne({_id: req.params.id } , req.body)
            .then( () => res.redirect('/me/stored/products'))
            .catch(next)
    }

    // [DELETE] /products/:id
    delete(req, res, next) {
        Product.delete({_id: req.params.id})
            .then( () => res.redirect('back'))
            .catch(next);
    }

    // [DELETE] /products/:id/force
    deleteForce(req, res, next) {
        Product.deleteOne({_id: req.params.id})
            .then( () => res.redirect('back'))
            .catch(next);
    }

    // [PATCH] /products/:id/restore
    restore(req, res, next) {
        Product.restore({_id: req.params.id})
        .then( () => res.redirect('back'))
        .catch(next);
    }

    // [POST] /products/handle-form-action
    handleFormAction(req, res, next){
        switch(req.body.action){
            case 'delete':
                Product.delete({_id: { $in: req.body.productIds} })
                    .then( () => res.redirect('back'))
                    .catch(next);
                break;
            case 'delete-force':
                Product.deleteOne({_id: { $in: req.body.productIds} })
                    .then( () => res.redirect('back'))
                    .catch(next);
                break;
            case 'restore':
                Product.restore({_id: { $in: req.body.productIds} })
                    .then( () => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({message: 'Action is invalid!'})
        }
    }

    
}

module.exports = new ProductController();
