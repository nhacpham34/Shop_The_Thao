const express = require('express');
const methodOverride = require('method-override')
const path = require('path');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const app = express();
const db = require('./config/db');

const SortMiddleware = require('./app/middleware/SortMiddleware')

// connect to db
db.connect();

const router = require('./routes');
const port = 3000;

// Khai báo static file
app.use(express.static(path.join(__dirname, 'assets')));

// HTTP logger
app.use(morgan('combined'));

app.use(express.urlencoded())

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

// Custom middaelwware
app.use(SortMiddleware);

// Template engine
app.engine('hbs', handlebars({ 
    extname: '.hbs' ,
    helpers: {
        sum : (a,b ) => a+b,
        sortable: (field, sort) => {
            const sortType = field === sort.column ? sort.type : 'default';

            const icons = {
                default: 'fas fa-sort',
                asc : 'fas fa-sort-amount-down-alt',
                desc: 'fas fa-sort-amount-down',
            };

            const types = {
                default : 'desc',
                asc : 'desc',
                desc : 'asc',
            }

            const icon = icons[sortType];
            const type = types[sortType];
            return `
            <a href="?_sort&column=${field}&type=${type}"><i class="${icon}"></i></a>
            `
        }
    }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources','views'));

//  router init
router(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
