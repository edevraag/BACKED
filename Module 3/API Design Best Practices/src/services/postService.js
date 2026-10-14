
const store = require('../data/postStore');

function listPosts(query = {}) {
  const allPosts = store.getAllPosts();

  // Read pagination values from the query string
  const requestedPage = parseInt(query.page, 10);
  const requestedLimit = parseInt(query.limit, 10);

  const page = Number.isInteger(requestedPage) && requestedPage > 0
    ? requestedPage
    : 1;

  const limit = Number.isInteger(requestedLimit) && requestedLimit > 0
    ? Math.min(requestedLimit, 100)
    : 2;

  const total = allPosts.length;
  const pages = Math.ceil(total / limit);
  const start = (page - 1) * limit;

  const data = allPosts.slice(start, start + limit);

  return {
    data,
    meta: {
      page,
      limit,
      total,
      pages,
    },
  };
}

function getPost(id) {
  return store.getPostById(id);
}

function createPost(body = {}) {
  return store.createPost({
    title: body.title,
    author: body.author,
  });
}

function likePost(id) {
  // Return null when the post doesn't exist
  return store.incrementLikes(id);
}

function explode() {
  const err = new Error('SQLITE_CONSTRAINT in posts table');
  err.statusCode = 500;
  throw err;
}

module.exports = {
  listPosts,
  getPost,
  createPost,
  likePost,
  explode,
};
