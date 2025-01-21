const express = require('express');
const router = express.Router();

//imports here
const budgetRoutes = require("./budgetRoutes");
const adminRoutes = require("./adminRoutes");
const userRoutes = require("./userRoutes");

//code here
router.use("/budget", budgetRoutes);
router.use("/admin", adminRoutes);
router.use("/user", userRoutes);
router.get("/health-check", (req,res)=>{
  res.json("Server Health: OK");
})

module.exports = router;