const express = require('express');
const router = express.Router();

const Employee = require('../DAL/Employee')
const Manager = require('../DAL/Manager');
const Person = require('../DAL/Person');
const Report = require('../DAL/Report');
const Tasks = require('../DAL/Tasks');








/* GET home page. */
router.get('/', async function(req, res, next) 
{
   let data = await Person.getPersons();//get all persons - employees and managers from employee collection

  res.render('index', {obj : data});//show employee to user
});
//==========================================================
//show all details of employee or manager
router.post('/employeeDetails', async function(req, res, next) 
{
  let name;
  let data = await Person.getPersons();
  
  let firstname;
  let lastname;

  data.forEach(async element => {
    name = element.firstName + element.lastName;
    if (name === req.body.person)
    {
      firstname = element.firstName;
      lastname = element.lastName;

      let report = await Report.getReportOrTask({firstName : firstname, lastName : lastname});

      if(element.position === 'manager')
      {
        let myEmployees = await Manager.getMyEmployees({firstname, lastname});
        console.log(myEmployees);

        res.render('managerDetails', {element, report, myEmployees});
      }
      else
      {
        let myTasks = await Tasks.getReportOrTask({firstName : firstname, lastName : lastname});
        res.render('employeeDetails', {element, report, myTasks});
      }
    }});
});

//==========================================================
router.get('/newReport/:managerOrEmployee/:firstn/:lastn', async function(req, res, next) 
{
  let firstName = req.params.firstn;

  let lastName = req.params.lastn;


  let data;
  let newData = [];
  if(req.params.managerOrEmployee === '1')//this is manager
  {
    data = await Manager.getManagers();


    data.forEach(element => {
      if(firstName != element.firstName || lastName != element.lastName)
      {
        newData.push(element);
      }
    });
  }

  if(req.params.managerOrEmployee === '2')//this is employee
  {
    let data = await Employee.getMyManager({firstName : firstName, lastName : lastName});

    let fn = data[0].managerFirstName;
    let ln = data[0].managerLastName;

    newData.push({firstName : fn, lastName : ln});
  }
  
  res.render('report', {element : newData});
});

//==========================================================
router.post('/newReport', async function(req, res, next) 
{
 
  res.render('writeReport', {element : req.body.name});
})
//==========================================================
router.post('/saveReport/:name', async function(req, res, next) 
{
  let a = req.params.name;

  const firstname = a.split(' ').slice(0, 1).join(' ');
  const lastname = a.split(' ').slice(1, 2).join(' ');

  let obj;
  obj = {firstName : firstname, lastName : lastname, text : req.body.report, date : Date()};
  await Report.createReport(obj);

  let data = await Person.getPersons();
  res.render('index', {obj : data});

})
//=======================================
router.post('/newTask', async function(req, res, next) 
{
  res.render('writeTask', {name : req.body.personTask});

})
//=======================================
router.post('/saveTask/:name', async function(req, res, next) 
{
  let a = req.params.name;


  const firstname = a.split(' ').slice(0, 1).join(' ');
  const lastname = a.split(' ').slice(1, 2).join(' ');

  let obj;
  obj = {firstName : firstname, lastName : lastname, text : req.body.report, date : Date(), dueDate : req.body.dateTask}
  await Tasks.createTask(obj);

  let data = await Person.getPersons();
  res.render('index', {obj : data});

})


module.exports = router;
