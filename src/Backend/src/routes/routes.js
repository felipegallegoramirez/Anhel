const express = require("express");
const router = express.Router();

const user = require("../controllers/user.controller");
const session = require("../controllers/session.controller");
const process = require("../controllers/process.controller");
const temporal = require("../controllers/temporal.controller")
const as = require("../controllers/file.controller")

//user
router.get("/user/", user.getUsers);
router.post("/user/", user.createUser);
router.get("/user/:id", user.getUser);
router.put("/user/:id", user.editUser);
router.delete("/user/:id", user.deleteUser);
router.post("/user/confirm/", user.confirm);


router.get("/session/", session.getSessions);
router.post("/session/", session.createSession);
router.get("/session/:id", session.getSession);
router.put("/session/:id", session.editSession);
router.delete("/session/:id", session.deleteSession);


router.get("/process/", process.getProcesss);
router.post("/process/", process.createProcess);
router.get("/process/:id", process.getProcess);
router.put("/process/:id", process.editProcess);
router.delete("/process/:id", process.deleteProcess);

router.get("/temporal/", temporal.getTemporals);
router.post("/temporal/", temporal.createTemporal);
router.get("/temporal/:id", temporal.getTemporal);
router.put("/temporal/:id", temporal.editTemporal);
router.delete("/temporal/:id", temporal.deleteTemporal);

router.get("/Storage/:id", as.get);


module.exports = router;