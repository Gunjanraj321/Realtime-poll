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

const addReply = async (req, res) => {
  const { commentId } = req.params;
  const { text } = req.body;
  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    comment.replies.push({
      text: text,
      user: req.user._id,
      createdAt: new Date(),
    });
    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error while Adding Reply" });
  }
};

const getCommentOfPoll = async (req, res) => {
  const { pollId } = req.params;
  try {
    const comments = await Comment.find({ poll: pollId })
      .populate("user", ["username"])
      .populate("replies.user", ["username"]);
    res.status(200).json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error while fetching comments" });
  }
};

module.exports = { addComment, addReply, getCommentOfPoll };
