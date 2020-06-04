const Comment = require('@models/comment');
const Blog = require('@models/blog');

const getAll = async (req, res) => {
  const { id } = req.params;
  const comments = await Comment.find({ blog: id });
  res.json(comments.map((comment) => comment.toJSON()));
};

const create = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const blog = await Blog.findById(id);

  if (!blog) {
    res.status(404).end();
    return;
  }

  const newComment = new Comment({ ...body, blog: blog._id, date: new Date() });
  const comment = await newComment.save();

  blog.comments = blog.comments.concat(comment._id);
  await blog.save();

  res.status(201).json(comment.toJSON());
};

module.exports = { getAll, create };
