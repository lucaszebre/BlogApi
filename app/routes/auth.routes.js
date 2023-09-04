const controller = require("../controllers/auth.controller");
const verifyToken = require ('../middlewares/isAuth')

module.exports = function(app) {

    app.post('/register', controller.register);
    app.post('/login',controller.login);
    app.post('/logout',controller.logout)

}