const express = require('express');
const path = require('path');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const app = express();

const router = require('./routes');
const port = 3000;

// Khai báo static file
app.use(express.static(path.join(__dirname, 'assets')));

// HTTP logger
app.use(morgan('combined'));

// Template engine
app.engine('hbs', handlebars({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

//  router init
router(app);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
