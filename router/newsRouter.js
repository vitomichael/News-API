const express = require("express");
const router = express.Router();
const {authenticateToken, permit} = require('../middleware/auth')
const upload = require('../middleware/upload')


const {
  getBerita,
  createBerita,
  updateBerita,
  deleteBerita,
  spesificNews,
} = require("../controller/newsController");
const { createComment, deleteComment } = require("../controller/commentController");

router.get("/", getBerita);
router.get('/:id', spesificNews)
router.post('/comment/:id', authenticateToken, createComment)
router.delete('/comment/:id', authenticateToken, deleteComment)
router.post("/", authenticateToken, permit('admin'), upload, createBerita);
router.put("/:id", authenticateToken, permit('admin'), updateBerita);
router.delete("/:id", authenticateToken, permit('admin'), deleteBerita);
module.exports = router;
