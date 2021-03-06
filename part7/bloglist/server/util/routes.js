const Router = require('express');
const blogs = require('@controllers/blogsController');
const login = require('@controllers/loginController');
const users = require('@controllers/usersController');
const comments = require('@controllers/commentsController');

const router = Router();

router.get('/blogs', blogs.getAll);
router.get('/blogs/:id', blogs.getOne);
router.post('/blogs', blogs.create);
router.put('/blogs/:id', blogs.update);
router.delete('/blogs/:id', blogs.destroy);

router.get('/blogs/:id/comments', comments.getAll);
router.post('/blogs/:id/comments', comments.create);

router.post('/login', login.login);

router.get('/users', users.getAll);
router.post('/users', users.create);

module.exports = router;
