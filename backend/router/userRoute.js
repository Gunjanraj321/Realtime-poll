const router = require('express').Router();

const {userSignup, userLogin} = require('../controllers/userController');
const { getUserProfile } = require('../controllers/userProfile');
const { verify }= require('../middleware/verifyToken');

router.post('/signup', userSignup);
router.post('/login', userLogin);
router.get('/profile',verify, getUserProfile);

module.exports = router;