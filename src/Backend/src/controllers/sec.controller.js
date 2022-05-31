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
  const user = await User.findById(b.iduser);
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

sec.message = async (data)=>{
  emisor = await sec.activeId(data.idtemp);
  e=false;
  if (emisor!=undefined){
    session= await Session.findById(data.idsession);
    if((session.idpatient==data.idreceptor ||session.idpsichologist==data.idreceptor)
     && (session.idpatient==emisor.iduser ||session.idpsichologist==emisor.iduser)){
      mensaje={
        message: data.mensaje,
        sender:data.idreceptor,
        date:data.fecha,
      }
      session.chat.push(mensaje)
      await Session.findByIdAndUpdate(data.idsession, {chat:session.chat}, {new: true});
      e=true
    }
  }else{

  }
  return new Promise((resolve,reject)=>{
    try{
      resolve (e)
    }catch(err){
      reject("Error")
    }
  })
}



module.exports = sec;