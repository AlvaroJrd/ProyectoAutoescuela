var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var Test = require("../models/Test");
var db = mongoose.connection;

// GET del listado de usuarios
router.get("/", function (req, res, next) {
    Test.find()
      .exec(function (err, tests) {
        if (err) {
          res.status(500).send(err);
          console.log(err);
        } else res.status(200).json(tests);
      });
});

// GET de un único usuario por su DNI
router.get("/tipo", function (req, res, next) {
  var tipo = req.query.tipo;
  Test.find({ tipo: tipo }, function (err, testinfo) {
    if (err) res.status(500).send(err);
    else res.status(200).json(testinfo);
  });
});

// POST de un nuevo usuario
router.post("/", function (req, res, next) {
  Test.create(req.body, function (err, testinfo) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});

// DELETE de un usuario por su Id
router.delete("/:id", function (req, res, next) {
  Test.findByIdAndDelete(req.params.id, function (err, userinfo) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});

module.exports = router;
