const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name:  String,
    phonenumber:  Number,
    email:  String,
    password:  String,
    strikes:  Number,
    type:  String,
    status:  String,
    idprocesses:  [String],
    idsession:  [String],
    idpublications:  [String],

  },
  {
    versionKey: false,
    timestamps: false,
  }
);

module.exports = mongoose.model("User", userSchema);