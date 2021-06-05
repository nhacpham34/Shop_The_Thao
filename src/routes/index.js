const productRouter = require('./products');
const siteRouter = require('./site');

function router(app) {
    app.use('/products', productRouter);
    app.use('/', siteRouter);
}

module.exports = router;
