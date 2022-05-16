const User = require("../models/user");
const Temporal = require("../models/temporal");
const Session = require("../models/session");
const process = require("../models/process");

var mongoose = require('mongoose');

const sec = {};


sec.activeId = async (a)=>{
  /* el id tiene que ser alphanumerico de 24 caracteres o dara error*/
  var objectId = mongoose.Types.ObjectId(a);
  const temporal = await Temporal.findById(objectId);
  return new Promise((resolve,reject)=>{
    try{
      resolve (temporal)
    }catch(err){
      reject("Error")
    }
  })

}

sec.activeParams = async (a)=>{
  user = a;
  const temporals = await Temporal.find();
  exist= temporals.find(element=> element.email == user.email &&  element.name == user.name)
  if (exist==undefined)exist=null
  return new Promise((resolve,reject)=>{
    try{
      resolve (exist)
    }catch(err){
      reject("Error")
    }
  })
}

sec.userJoin = async (a)=>{
  user = a;
  const users = await User.find();
  exist= users.find(element=> element.email == user.email &&  element.password == user.password)
  return new Promise((resolve,reject)=>{
    try{
      resolve (exist)
    }catch(err){
      reject("Error")
    }
  })
}

sec.isPsychologistID = async (a)=>{
  b = await sec.activeId(a);
  const user = await User.findById(b._id);
  if (user==null){
    exist=false;
  }else{
    if(user.type=="p"){
      exist=true;
    }else{
      exist=false;
    }
  }
  return new Promise((resolve,reject)=>{
    try{
      resolve (exist)
    }catch(err){
      reject("Error")
    }
  })
}


module.exports = sec;