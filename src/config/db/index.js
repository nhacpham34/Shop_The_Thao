// Using Node.js `require()`
const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost/sport_shop_dev', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log("Connect is sussecfully!!!");  
    } catch (error) {
        console.log("Connect is Faill!!!");   
    }
}

module.exports = { connect };
