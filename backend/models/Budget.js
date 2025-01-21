const bcrypt = require("bcryptjs");
const Messages = require("../constants/Message");
const TryCatch = require("../helper/TryCatch");
const { ObjectId } = require('mongodb');
const budgetsCollection = require("../db").db().collection("budget");

let Budget = function (data) {
  this.data = data;
  this.errors = [];
};

Budget.prototype.cleanUp = function () {
  // get rid of any bogus properties
  this.data = {
      

//predfined start
    createdAt: new Date(),
//predefined end
  };
};

Budget.prototype.createBudget = async function(){
  this.cleanUp()
 const budgetDoc = await budgetsCollection.insertOne(this.data);
  return budgetDoc
}
              
Budget.prototype.getById = async function (id){
  let budgetDoc = await budgetsCollection.findOne({_id: new ObjectId(id)})
  return budgetDoc
}

Budget.prototype.updateById = async function (id, data) {
  let budgetDoc = await budgetsCollection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    {
      $set: {
        ...data,
        updatedAt: new Date(),
      },
    },
    {
      returnDocument: "after",
    }
  );

  return budgetDoc;
};

Budget.prototype.getAllBudgets = async function (){
  let budgetDoc = await budgetsCollection.find({}).toArray()
  return budgetDoc
}

Budget.prototype.deleteById = async function (id){
 await budgetsCollection.deleteOne({_id: new ObjectId(id)})
  return 
}

module.exports = Budget;