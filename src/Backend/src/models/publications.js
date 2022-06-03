const mongoose = require("mongoose");
const { Schema } = mongoose;

const publicationsSchema = new Schema(
  {
    idcreador: String,
    namecreador: String,
    date:  String,
    item:[{
      type:String,
      text:String
    }],
    title:  String,
  },
  {
    versionKey: false,
    typeKey: '$type',
    timestamps: false,
  }
);

module.exports = mongoose.model("Publication", publicationsSchema);