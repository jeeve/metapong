const mongoose = require("mongoose");

const ClientsModel = mongoose.model(
  "metapong",
  {
    id: {
      type: String,
      required: true,
    },
    cx: {
      type: String,
    },
    cy: {
      type: String,
    },
    vx: {
      type: String,
    },
    vy: {
      type: String,
    },
    message: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    }
  },
 // {
  //  timestamps: true,
 // },
  "clients"
);

module.exports = { ClientsModel };
