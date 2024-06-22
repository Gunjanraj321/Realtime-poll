const router = require('express').Router();

const {userSignup, userLogin} = require('../controllers/userController');

router.post('/signup', userSignup);
router.post('/login', userLogin);

module.exports = router;