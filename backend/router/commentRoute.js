const express = require('express');

const router = express.Router();
const {addComment} = require('../controllers/commentController');

const {verify} = require('../middleware/verifyToken');

router.post('/addcomment/:pollId', verify, addComment);

module.exports = router;