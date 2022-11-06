const employeeModel = require('../model/employeeModel');

const employeeAndManager = require('../model/listEmloyeesManagerModel');

class Person {
   constructor(obj) {//create new employee to database
    return new Promise((resolve, reject) =>
      {
          let employee = employeeModel(//create new employee
              {
                  firstName : obj.firstName,
                  lastName : obj.lastName,
                  position : obj.position,
                  manager : obj.manager
              })

              employee.save( function (err)//save in database
              {
                  if(err)
                  {
                      reject(err);
                  }
                  else
                  {
                      resolve('Created');
                  }
              })

              if(obj.position != 'manager')
              {
                let employeeAndManagerList = employeeAndManager(//save amployee at list of employees and managers
                    {
                        managerFirstName : obj.manager.firstName,
                        managerLastName : obj.manager.lastName,
                        employeeFirstName : obj.firstName,
                        employeeLastName : obj.lastName
                    })
                    
                    employeeAndManagerList.save( function (err)
                    {
                        if(err)
                        {
                            reject(err);
                        }
                        else
                        {
                            resolve('Created');
                        }})
                }

              
      })
  }    

  //================================================================


  static getPersons()
  {
      return new Promise((resolve, reject) =>
      {
        employeeModel.find({}, function(err, data)
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

  module.exports = Person



