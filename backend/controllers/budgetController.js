const Messages = require("../constants/Message");
  const JsonResponse = require("../helper/JsonResponse");
  const TryCatch = require("../helper/TryCatch");
  const Budget = require("../models/Budget");
const jwt = require("jsonwebtoken");

exports.createBudget = async function(req, res){
  let budget = new Budget(req.body)
 let budgetDoc = await budget.createBudget();
 new JsonResponse(req, res).jsonSuccess(budgetDoc, "Created")
}

exports.getById = async function (req, res) {
  let budget = new Budget ()
let budgetDoc = await budget.getById(req.params.id)
new JsonResponse(req, res).jsonSuccess(budgetDoc, new Messages().SUCCESSFULLY_RECEIVED)

}

exports.updateById = async function (req, res) {
  let budget = new Budget();
  let budgetDoc = await budget.updateById(req.params.id, req.body);
  new JsonResponse(req, res).jsonSuccess(budgetDoc, new Messages().SUCCESSFULLY_UPDATED);
};

exports.getAllBudgets = async function (req, res) {
  let budget = new Budget ()
let budgets = await budget.getAllBudgets()
new JsonResponse(req, res).jsonSuccess(budgets, new Messages().SUCCESSFULLY_RECEIVED)
return budgets
}

exports.deleteById = async function (req, res) {
  let budget = new Budget ();
await budget.deleteById()
new JsonResponse(req, res).jsonSuccess(true, new Messages().SUCCESSFULLY_DELETED)
}