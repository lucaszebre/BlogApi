const isAuthenticated = require('../middlewares/isAuth')
const controller = require("../controllers/comments.controller");
module.exports = function(app) {
    app.get('/user/:userId/post/:postId',isAuthenticated,controller.getComment);
    app.put('/comment/:commentId',isAuthenticated,controller.updateComment);
    app.delete('/comment/:commentId',isAuthenticated,controller.deleteComment);
    app.post('/user/:userId/post/:postId/comment/',isAuthenticated,controller.createComment);
}