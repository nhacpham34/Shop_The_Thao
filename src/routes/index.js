const productRouter = require('./products');
const meRouter = require('./me');
const siteRouter = require('./site');

function router(app) {
    app.use('/products', productRouter);
    app.use('/me', meRouter);
    app.use('/', siteRouter);
}

module.exports = router;
