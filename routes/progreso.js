var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var Progreso = require("../models/Progreso");
var db = mongoose.connection;

// GET del listado de usuarios
router.get("/", function (req, res, next) {
    Progreso.find()
      .exec(function (err, progresos) {
        if (err) {
          res.status(500).send(err);
          console.log(err);
        } else res.status(200).json(progresos);
      });
});

// GET progreso del usuario
router.get("/usuario", function (req, res, next) {
  var idUser = req.query.idUser;
  var idTest = req.query.idTest;
  Progreso.findOne({ dni: idUser, test: idTest }, function (err, progresoinfo) {
    if (err) res.status(500).send(err);
    else res.status(200).json(progresoinfo);
  });
});

// GET progreso del usuario
router.get("/idUser", function (req, res, next) {
  var idUser = req.query.idUser;
  Progreso.find({ dni: idUser }, function (err, progresoinfo) {
    if (err) res.status(500).send(err);
    else res.status(200).json(progresoinfo);
  });
});

// PUT de un usuario por su Id
router.put("/:id", function (req, res, next) {
  Progreso.findByIdAndUpdate(req.params.id, req.body, function (err, userinfo) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});

// POST de un nuevo usuario
router.post("/", function (req, res, next) {
  Progreso.create(req.body, function (err, progresoinfo) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});

// DELETE de un usuario por su Id
router.delete("/:id", function (req, res, next) {
  Progreso.findByIdAndDelete(req.params.id, function (err, userinfo) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});

module.exports = router;
