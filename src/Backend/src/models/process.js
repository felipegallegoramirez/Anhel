const mongoose = require("mongoose");
const { Schema } = mongoose;

const processSchema = new Schema(
  {
    idpatient:String,
    idpsichologist:String,
    count:Number,
    namepatient:String,
    namepsichologist:String
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

module.exports = mongoose.model("Process", processSchema);