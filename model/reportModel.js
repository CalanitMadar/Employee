const mongoose = require('mongoose');

let reportSchema = new mongoose.Schema({
    firstName : String,
    lastName : String,
    text : String,
    date : Date
})

module.exports = mongoose.model('reports', reportSchema);





