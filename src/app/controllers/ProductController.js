class ProductController {
    // [GET] /products
    index(req, res) {
        res.render('product');
    }

    // [GET] /products:slug
    show(req, res) {
        res.send('new product!!');
    }
}

module.exports = new ProductController();
