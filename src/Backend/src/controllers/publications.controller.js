const Publication = require("../models/publications");
const User = require("../models/user");
const sec = require("./sec.controller");

const publicationCtrl = {};

publicationCtrl.getPublications = async (req, res, next) => {
  const publications = await Publication.find();
  // ! Eliminar idcreator
  res.json(publications);
};

publicationCtrl.createPublication = async (req, res, next) => {
  
  const { id } = req.params;
  var publication = new Publication({
    idcreador: req.body. idcreador,
    namecreador: req.body.namecreador ,
    date: req.body.date,
    title: req.body.title,
    item: req.body.item
  });
  

  var us = await sec.activeId(id)
  if (us!= null && us.type=="p"){
    var user = await User.findById(us.iduser)
    publication.namecreador=us.name;
    publication.idcreador=user._id;
    var pub= await publication.save();
    user.idpublications.push(pub._id)
    await User.findByIdAndUpdate(us.iduser, user)
  }
  res.json(publication);
};

publicationCtrl.getPublication = async (req, res, next) => {
  // !Eliminar creator
  const { id } = req.params;
  const publication = await Publication.findById(id);
  res.json(publication);
};

publicationCtrl.editPublication = async (req, res, next) => {
  const { id } = req.params;
  await Publication.findByIdAndUpdate(id, {$set: req.body}, {new: true});
  res.json({ status: "Publication Updated" });
};

publicationCtrl.deletePublication = async (req, res, next) => {
  await Publication.findByIdAndRemove(req.params.id);
  res.json({ status: "Publication Deleted" });
};



module.exports = publicationCtrl;