const passport = require("passport");
const controller = require("../controllers/user.controller");
module.exports = function(app) {

    app.get('/user/:userId',passport.authenticate('jwt', { session: false }),controller.getUserById);
    app.put('/user/:userId',passport.authenticate('jwt', { session: false }),controller.updateUser);
    
}