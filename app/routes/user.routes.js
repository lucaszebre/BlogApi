const controller = require("../controllers/user.controller");
const verifyToken = require ('../middlewares/isAuth')

module.exports = function(app) {

    app.get('/user/:userId',controller.getUserById);
    app.put('/user/:userId',verifyToken,controller.updateUser);
    app.post('/user', verifyToken,controller.createUser);
    app.delete('/user/:userId',verifyToken,controller.deleteUser);

}