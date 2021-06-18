const Product = require('../models/ProductModel');
const {mutipleMongooseToObject} = require('../until/mongoose')
class SiteController {
    // [GET] /home
    index(req, res, next) {
        Promise.all([Product.find({ type: 'MEN'}),Product.find({ type: 'boys'})])
            .then(([productsMen, productsBoy] ) => {
                res.render('home', { 
                    productsMen : mutipleMongooseToObject(productsMen), 
                    productsBoy :mutipleMongooseToObject(productsBoy)
                });
            })
            .catch(next);
    }
}
module.exports = new SiteController();
