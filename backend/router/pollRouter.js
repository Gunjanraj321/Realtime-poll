const express = require('express');

const router = express.Router();
const {verify} = require('../middleware/verifyToken');
const { createPoll, getPollResults ,fetchPolls} = require('../controllers/pollController');
console.log("verify:", typeof verify);

router.post('/poll/createPoll',verify, createPoll);
router.post('/poll/:pollId/pollResult', getPollResults);
router.get('/poll',fetchPolls);

module.exports = router;