const Comment = require("../models/commentModal");

const addComment = async (req, res) => {
  const { pollId } = req.params;
  const { text } = req.body;
  try {
    const comment = await Comment.create({
      text: text,
      poll: pollId,
      user: req.user._id,
    });
    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { addComment };
