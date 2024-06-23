const Poll = require("../models/pollModel");
const User = require("../models/userModel");
const { v4: uuidv4 } = require("uuid");

const createPoll = async (req, res) => {
  const { question, options } = req.body;
  const userId = req.user.id;

  // Ensure there are options provided and at least two options
  if (!options || options.length < 2) {
    return res
      .status(400)
      .json({ message: "Poll must have at least two options" });
  }

  // Add unique IDs to each option
  const optionsWithId = options.map((option, index) => ({
    id: (index + 1).toString(),
    text: option.text,
    votes: [],
    voteCount: 0,
  }));

  try {
    const poll = await Poll.create({
      question,
      options: optionsWithId,
      createdBy: userId,
    });
    // console.log(`---------`)
    await User.findByIdAndUpdate(userId, { $push: { createdPolls: poll._id } });
    // console.log(`======`)
    return res.status(201).json(poll);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const getPollResults = async (req, res) => {
  const { pollId } = req.params;
  try {
    const poll = await Poll.findById(pollId);
    if (!poll) {
      return res.status(404).json({ message: "Poll not found" });
    }
    const pollResult = {
      _id: poll._id,
      question: poll.question,
      options: poll.options.map((option) => ({
        id: option.id,
        text: option.text,
        voteCount: option.voteCount,
      })),
      totalVotes: poll.options.reduce(
        (total, option) => total + option.voteCount,
        0
      ),
    };
    return res.status(200).json(pollResult);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const fetchPolls = async (req, res) => {
  try {
    const polls = await Poll.find().populate("createdBy", "username");
    res.json(polls);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
module.exports = { createPoll, getPollResults, fetchPolls };
