const mongoose = require('mongoose');

mongoose.connect(
  "mongodb://localhost:27017/metapong",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (!err) console.log("Mongodb connected");
    else console.log("Connection error :" + err);
  }
)