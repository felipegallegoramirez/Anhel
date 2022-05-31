const express = require("express");
const router = express.Router();

const user = require("../controllers/user.controller");
const session = require("../controllers/session.controller");
const process = require("../controllers/process.controller");
const temporal = require("../controllers/temporal.controller")
const as = require("../controllers/file.controller")


// !Que hace -> Que Pide -> Que devuelve

//user
//router.get("/user/", user.getUsers);
router.post("/user/", user.createUser); // * Crea el usuario -> User -> "Finalizado"
router.get("/user/:id", user.getUser); // * obtener user el usuario -> idUser -> User
router.put("/user/:id", user.editUser);
//router.delete("/user/:id", user.deleteUser);
router.post("/user/confirm/", user.confirm); // * Login -> Correo y contraseña -> Temporal


router.get("/session/", session.getSessions); // * Devuelve todas las sesiones sin datos comprometedores -> vacio -> sesiones[]
router.post("/session/:id", session.createSession); // * Crea una session -> Session -> idsession
//router.put("/session/:id", session.editSession);
router.delete("/session/:id", session.deleteSession);// * Buscar session id-> id -> session
router.get("/session/mysession/:id", session.mySessions); // * Sesiones propias -> idsessions[] -> sesiones[]
router.get("/join/:id/:temp", session.joinsession);// * Unirse a una sesion -> id:idsesion temp:idtemporal -> "Todo piola"


//router.get("/process/", process.getProcesss);
//router.post("/process/", process.createProcess);
//router.get("/process/:id", process.getProcess);
//router.put("/process/:id", process.editProcess);
//router.delete("/process/:id", process.deleteProcess);
router.get("/process/myprocess/:id", process.myProcess); // * procesos propios -> idprocesos[] -> procesos[]

//router.get("/temporal/", temporal.getTemporals);
//router.post("/temporal/", temporal.createTemporal);
//router.get("/temporal/:id", temporal.getTemporal);
//router.put("/temporal/:id", temporal.editTemporal);
//router.delete("/temporal/:id", temporal.deleteTemporal);

//router.get("/Storage/:id", as.get);


module.exports = router;