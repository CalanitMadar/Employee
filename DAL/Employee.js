const Person = require('./Person');
const employeeModel = require('../model/employeeModel');
const employeeAndManager = require('../model/listEmloyeesManagerModel');


class Employee extends Person 
{
  constructor(obj) {
      super(obj);
    }
    //=============================================
    //get a list of all non-executive regular employees 
    static getEmployees()
    {
      return new Promise((resolve, reject) =>
        {
  
            employeeModel.find({position : "employee"}, function(err, data)
            {
                if(err)
                {
                    reject(err)
                }
                else
                {
                    resolve(data)
                }
            })
        })
    }


    
//========================================
//A function that returns the manager of a specific employee
static getMyManager(obj)
{
  return new Promise((resolve, reject) =>
    {

        employeeAndManager.find({employeeFirstName : obj.firstName , employeeLastName : obj.lastName}, function(err, data)
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve(data)
            }
        })
    })
}
  
}
module.exports = Employee;
