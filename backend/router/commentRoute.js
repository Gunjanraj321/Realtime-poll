const express = require('express');

const router = express.Router();
const {addComment, addReply, getCommentOfPoll} = require('../controllers/commentController');

const {verify} = require('../middleware/verifyToken');

router.post('/addcomment/:pollId', verify, addComment);
router.post('/addreply/:commentId', verify, addReply);
router.get('/comments/:pollId',verify, getCommentOfPoll);

module.exports = router;