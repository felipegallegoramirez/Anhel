const mongoose = require("mongoose");
const { Schema } = mongoose;

const temporalSchema = new Schema(
  {
    name:  String,
    email:  String,
    type:  String,
    status:  String,
    iduser:  String,
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

module.exports = mongoose.model("Temporal", temporalSchema);