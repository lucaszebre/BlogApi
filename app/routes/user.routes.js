const controller = require("../controllers/user.controller");
module.exports = function(app) {

    app.get('/user/:userId',controller.getUserById);
    // app.put('/user/:userId/boards/:boardId',controller.updateBoards);
    app.post('/user',controller.createUser);
    // app.delete('/user/:userId/boards/:boardId',controller.deleteBoard);

}