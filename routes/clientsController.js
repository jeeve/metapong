const express = require('express');
const router = express.Router();

const { ClientsModel } = require('../models/clientsModel');

router.get('/', (req, res) => {
  InfosModel.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error to get data : " + err);
  })
});

<<<<<<< HEAD:routes/infosController.js
=======
router.post('/', (req, res) => {
  const newRecord = new ClientsModel({
    id: req.body.id,
    cx: req.body.cx,
    cy: req.body.cy,
    vx: req.body.vx,
    vy: req.body.vy,
    message: req.body.message
  });

  newRecord.save((err, docs) => {
    if (!err) res.send(docs);
    else console.log('Error creating new data : ' + err);
  })
});
// update
router.put("/:id", (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknow : " + req.params.id)
  
  const updateRecord = {
    author: req.body.author,
    message: req.body.message
  };

  ClientsModel.findByIdAndUpdate(
    req.params.id,
    { $set: updateRecord},
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Update error : " + err);
    }
  )
});

router.delete("/:id", (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknow : " + req.params.id)
  
    ClientsModel.findByIdAndRemove(
    req.params.id,
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Delete error : " + err);
    })
});

>>>>>>> 98c43778f39001b5c1fced1048be82023b06698d:routes/clientsController.js
module.exports = router;