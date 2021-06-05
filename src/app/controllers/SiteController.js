class SiteController {
    // [GET] /home
    index(req, res) {
        res.render('home');
    }
}

module.exports = new SiteController();
