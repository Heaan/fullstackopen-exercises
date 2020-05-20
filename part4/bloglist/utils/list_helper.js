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

const mostBlogs = (blogsList) => {
  if (blogsList.length === 0) return {};
  const authorMap = new Map();
  blogsList.forEach((blog) => {
    const { author } = blog;
    if (!authorMap.has(author)) authorMap.set(author, 0);
    authorMap.set(author, authorMap.get(author) + 1);
  });
  const blogs = Math.max(...authorMap.values());
  const author = [...authorMap].find((item) => item[1] === blogs)[0];
  return { author, blogs };
};

const mostLikes = (blogsList) => {
  if (blogsList.length === 0) return {};
  const authorMap = new Map();
  blogsList.forEach((blog) => {
    const { author, likes } = blog;
    if (!authorMap.has(author)) authorMap.set(author, 0);
    authorMap.set(author, authorMap.get(author) + likes);
  });
  const likes = Math.max(...authorMap.values());
  const author = [...authorMap].find((item) => item[1] === likes)[0];
  return { author, likes };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
