const express = require("express");
const router = express.Router();
const {
  createUser, loginUser, toggleRole, getAllUsers
} = require("../controller/userController");
const { authenticateToken, permit } = require("../middleware/auth");

router.post("/", createUser);
router.post('/login', loginUser)
router.put('/toggle/:id', authenticateToken, permit('admin'), toggleRole)
router.get('/allusers', authenticateToken,permit('admin'), getAllUsers)
module.exports = router;
