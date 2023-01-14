const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stockSchema = new Schema(
  {
    type: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;
