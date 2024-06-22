const express = require('express');

const router = express.Router();
const {addComment, addReply} = require('../controllers/commentController');

const {verify} = require('../middleware/verifyToken');

router.post('/addcomment/:pollId', verify, addComment);
router.post('/addreply/:commentId', verify, addReply);

module.exports = router;