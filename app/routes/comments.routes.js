const isAuthenticated = require('../middlewares/isAuth')
const controller = require("../controllers/comments.controller");
module.exports = function(app) {
    app.get('/user/:userId/post/:postId',isAuthenticated,controller.getComment);
    app.put('/comment/:commentId',isAuthenticated,controller.updateComment);
    app.post('/comment/:commentId',isAuthenticated,controller.deleteComment);
    app.delete('/user/:userId/post/:postId/comment/',isAuthenticated,controller.createComment);
}