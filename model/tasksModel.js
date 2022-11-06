const mongoose = require('mongoose');

let tasksSchema = new mongoose.Schema({
    firstName : String,
    lastName : String,
    text : String,
    date : Date,
    dueDate : Date
})

module.exports = mongoose.model('tasks', tasksSchema);





