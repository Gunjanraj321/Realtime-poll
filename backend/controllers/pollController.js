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

const getPollResults = async (req, res) => {
    const {pollId} = req.params;
    try{
        const poll = await Poll.findById(pollId);
        if(!poll){
            return res.status(404).json({message: 'Poll not found'});   
            }
        const pollResult = {
            _id:poll._id,
            question: poll.question,
            options: poll.options.map(option=> ({
                id:option.id,
                text:option.text,
                voteCount:option.voteCount,
        })),
        totalVotes: poll.options.reduce((total, option)=> total+ option.voteCount, 0)
    }
    return res.status(200).json(pollResult);
}catch(err){
    return res.status(400).json({message: err.message});
}
}

module.exports = {createPoll, getPollResults};