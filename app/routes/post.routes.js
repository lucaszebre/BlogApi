const isAuthenticated = require('../middlewares/isAuth')
const controller = require("../controllers/post.controller");
module.exports = function(app) {
    app.get('/user/:userId/post/:postId',isAuthenticated,controller.getPostById);
    app.put('/user/:userId/post/:postId',isAuthenticated,controller.updatePostById);
    app.post('/user/:userId',isAuthenticated,controller.createPost);
    app.delete('/user/:userId/post/:postId',isAuthenticated,controller.deletePostbyId);
}