const Form = require('./Form');
const taskModel = require('../model/tasksModel');

class Tasks extends Form{

   
  constructor(text, date, duedate) {
    super(text, date);
    this.duedate = duedate;

  }    
  //================================================================
  //create new task by firstname, lastname, text, date and duedate
  static createTask(obj)
  {
    return new Promise((resolve, reject) =>
      {
          let task = taskModel(
              {
                  firstName : obj.firstName,
                  lastName : obj.lastName,
                  text : obj.text,
                  date : obj.date,
                  dueDate : obj.dueDate
              })

              task.save( function (err)
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
            })
  }
//================================================================
//get all tasks of spcific person
static getReportOrTask(obj)
{
  return new Promise((resolve, reject) =>
    {
        taskModel.find({firstName : obj.firstName, lastName : obj.lastName}, function(err, data)
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
//================================================================

}

  module.exports = Tasks
