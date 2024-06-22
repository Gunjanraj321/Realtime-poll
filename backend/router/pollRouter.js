const express = require('express');

const router = express.Router();
const {verify} = require('../middleware/verifyToken');
const { createPoll } = require('../controllers/pollController');
console.log("verify:", typeof verify);

router.post('/poll/createPoll',verify, createPoll);

module.exports = router;