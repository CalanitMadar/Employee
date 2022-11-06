const Person = require('./Person');
const employeeModel = require('../model/employeeModel');
const employeeAndManager = require('../model/listEmloyeesManagerModel')

class Manager extends Person {

  constructor(obj) {
    super(obj);
   
  }
  //======================================
  //get list of manager from list of all employees
  static getManagers()
  {
    return new Promise((resolve, reject) =>
      {

          employeeModel.find({position : "manager"}, function(err, data)
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
  //Getting a list of all employees of a specific manager

static getMyEmployees(obj)
{
  return new Promise((resolve, reject) =>
    {

        employeeAndManager.find({managerFirstName : obj.firstname , managerLastName : obj.lastname}, function(err, data)
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
module.exports = Manager
