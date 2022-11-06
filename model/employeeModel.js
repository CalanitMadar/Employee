const mongoose = require('mongoose');

let employeeSchema = new mongoose.Schema({
    firstName : String,
    lastName : String,
    position : String,
    manager : {firstName : String, lastName : String}
})

module.exports = mongoose.model('employees', employeeSchema);





