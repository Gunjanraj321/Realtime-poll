const Poll = require('../models/pollModel');
const User = require('../controllers/userController');

const createPoll = async (req, res) =>{
    const {question, options} = req.body;
    const userId = req.user._id;
    try{
        const poll = await Poll.create({question, options, createdBy:userId});
        console.log(poll)
        await User.findByIdAndUpdate(userId, {$push: {createdPolls: poll._id}})
        return res.status(201).json(poll);
    }catch(err){
        return res.status(400).json({message: err.message});
    }
}

module.exports = {createPoll};