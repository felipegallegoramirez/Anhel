const fs = require("fs");

const file = {};


file.upload = async (req, res, next) => {
    try{
    var x = req.files
    var a= []
    for (var i =0 ; i<x.length ; i++){
        fs.renameSync(x[i].path,x[i].path+ '.' + x[i].mimetype.split('/')[1]);
        a.push(x[i].path+ '.' + x[i].mimetype.split('/')[1]);
    }
    res.json(a)}
    catch{
    res.json("Error inesperado")}
};


file.get = async (req, res, next) => {
    const path = req.body.path;
    res.file("public/images/"+path)    ;}

  module.exports = file;