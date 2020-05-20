const dummy = (blogs) => {
  if (Array.isArray(blogs)) return 1;
  return 1;
};

const totalLikes = (blogs) => {
  const total = blogs.length === 0 ? 0 : blogs.reduce((sum, blog) => sum + blog.likes, 0);
  return total;
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return {};
  const maxLikes = Math.max(...blogs.map((blog) => blog.likes));
  const { title, author, likes } = blogs.find((blog) => blog.likes === maxLikes);
  return { title, author, likes };
};

module.exports = { dummy, totalLikes, favoriteBlog };
