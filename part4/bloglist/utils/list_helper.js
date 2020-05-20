const dummy = (blogs) => {
  if (Array.isArray(blogs)) return 1;
  return 1;
};

const totalLikes = (blogs) => {
  const total = blogs.length === 0 ? 0 : blogs.reduce((sum, blog) => sum + blog.likes, 0);
  return total;
};

module.exports = { dummy, totalLikes };
