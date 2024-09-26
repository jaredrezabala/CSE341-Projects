const express = require('express')
const router = express.Router()
const usersController = require("../controllers/user")

router.get("/", usersController.getAll)
router.get("/:id", usersController.getSingle)
router.post("/", usersController.addNewUser)
router.put("/:id", usersController.updateUser)
router.delete("/:id", usersController.deleteUser)

module.exports = router