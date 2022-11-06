const Form = require('./Form');
const reportModel = require('../model/reportModel');

const prompt = require("prompt-sync")({sigint:true});



class Report extends Form{

   
  constructor(text, date) {
    super(text, date);

  }    
  //================================================================
  //create new report by firstname, lastname, text and date
  static createReport(obj)
  {
    return new Promise((resolve, reject) =>
      {
          let report = reportModel(
              {
                  firstName : obj.firstName,
                  lastName : obj.lastName,
                  text : obj.text,
                  date : obj.date
              })

              report.save( function (err)
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
  //get all report of specific person
  static getReportOrTask(obj)
  {
    return new Promise((resolve, reject) =>
      {
          reportModel.find({firstName : obj.firstName, lastName : obj.lastName}, function(err, data)
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

  module.exports = Report
