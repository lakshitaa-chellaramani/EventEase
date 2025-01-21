const bcrypt = require("bcryptjs");
const Messages = require("../constants/Message");
const TryCatch = require("../helper/TryCatch");
const { ObjectId } = require('mongodb');
const adminsCollection = require("../db").db().collection("admin");

let Admin = function (data) {
  this.data = data;
  this.errors = [];
};

Admin.prototype.cleanUp = function () {
  // get rid of any bogus properties
  this.data = {
    //predfined start
    name: this.data.name,
    lName: this.data.lName,
    email: this.data.email.trim().toLowerCase(),
    password: this.data.password,
    contactNumber: this.data.contactNumber,
    address: this.data.address,
    city: this.data.city,
    role: "admin",
    createdAt: new Date(),
//predefined end

  };
};

Admin.prototype.login = async function () {
  let attemptedUser = await adminsCollection.findOne({ email: this.data.email });
  this.cleanUp();
  if (
    attemptedUser &&
    bcrypt.compareSync(this.data.password, attemptedUser.password)
  ) {
    this.data = attemptedUser;
    return true;
  } else {
    return false;
  }
};

Admin.prototype.register =async function  () {
    this.cleanUp();
 
      let salt = bcrypt.genSaltSync(10);
      this.data.password = bcrypt.hashSync(this.data.password, salt);
      await adminsCollection.insertOne(this.data);
      return true
    
};

Admin.prototype.findByEmail = async function (email) {
  let adminDoc = await adminsCollection.findOne({ email: email })
  return adminDoc
     
};

Admin.prototype.doesEmailExist = async function (email) {
 
    let admin = await adminsCollection.findOne({ email: email });
    if (admin) {
      return true;
    } else {
      return false;
    }
  }

Admin.prototype.getById = async function (id){
  let adminDoc = await adminsCollection.findOne({_id: new ObjectId(id)})
  return adminDoc
}

Admin.prototype.updateById = async function (id, data) {
  let adminDoc = await adminsCollection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    {
      $set: {
        name: data.name,
        lName: data.lName,
        email: data.email,
        contactNumber: data.contactNumber,
        address: data.address,
        city: data.city,
        role: "admin",
        updatedAt: new Date(),
      },
    },
    { returnDocument: "after" }
  );
  return adminDoc;
};

Admin.prototype.updateByEmail = async function (email, data) {
  let adminDoc = await adminsCollection.findOneAndUpdate(
    { email: email },
    {
      $set: {
        name: data.name,
        lName: data.lName,
        email: data.email,
        contactNumber: data.contactNumber,
        address: data.address,
        city: data.city,
        role: "admin",
        updatedAt: new Date(),
      },
    },
    { returnDocument: "after" }
  );
  return adminDoc;
};


Admin.prototype.getAllAdmins = async function (){
  let adminDoc = await adminsCollection.find({}).toArray()
  return adminDoc
}

Admin.prototype.deleteById = async function (id){
 await adminsCollection.deleteOne({_id: new ObjectId(id)})
  return 
}

module.exports = Admin;