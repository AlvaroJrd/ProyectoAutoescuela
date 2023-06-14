var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var Pregunta = require("../models/Pregunta");
var db = mongoose.connection;

// GET del listado de preguntas
router.get("/", function (req, res, next) {
    Pregunta.find()
      .exec(function (err, preguntas) {
        if (err) {
          res.status(500).send(err);
          console.log(err);
        } else res.status(200).json(preguntas);
      });
});

// GET del listado de preguntas
router.get("/idTest", function (req, res, next) {
  var test = req.query.test;
  Pregunta.find({ test: test })
    .exec(function (err, preguntas) {
      if (err) {
        res.status(500).send(err);
        console.log(err);
      } else res.status(200).json(preguntas);
    });
});

// POST de un nuevo usuario
router.post("/", function (req, res, next) {
  Pregunta.create(req.body, function (err, preguntainfo) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});

// DELETE de un usuario por su Id
router.delete("/:id", function (req, res, next) {
  Pregunta.findByIdAndDelete(req.params.id, function (err, userinfo) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});

module.exports = router;
