const mongoose = require('mongoose');

let listEmployesManagerSchema = new mongoose.Schema({
    managerFirstName : String, 
    managerLastName : String,
    employeeFirstName : String,
    employeeLastName : String
})

module.exports = mongoose.model('EmployesManager', listEmployesManagerSchema);





