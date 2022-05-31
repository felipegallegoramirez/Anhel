const User = require("../models/user");
const Temporal = require("../models/temporal");
const Session = require("../models/session");
const process = require("../models/process");

var mongoose = require('mongoose');
const session = require("../models/session");

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
  e=null;
  if (emisor!=undefined){
    let session= await Session.findById(data.idsession);
    if(session.idpatient==emisor.iduser ||session.idpsichologist==emisor.iduser){
       let sender=session.idpatient==emisor.iduser?2:1
      mensaje={
        message: data.mensaje,
        sender:sender,
        date:data.fecha,
      }
      session.chat.push(mensaje)
      await Session.findByIdAndUpdate(data.idsession, {chat:session.chat}, {new: true});
      e=sender==1?session.idpatient:session.idpsichologist
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

sec.receptor = async (temp,sesion)=>{
  emisor = await sec.activeId(temp);
  e=null;
  if (emisor!=undefined){
    let session= await Session.findById(sesion);
    if(session.idpatient==emisor.iduser ||session.idpsichologist==emisor.iduser){
       let sender=session.idpatient==emisor.iduser?2:1
      e=sender==1?session.idpatient:session.idpsichologist
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