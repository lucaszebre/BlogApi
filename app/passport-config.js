const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const pool = require('./config/db.config.js')
const config = require('./config/auth.config.js')


const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.secret
};

module.exports = passport => {
passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      pool.query('SELECT * FROM users WHERE username = $1', [jwt_payload.username], (error, results) => {
        if (error) {
            throw error
        }else if(results.rows < 1){
            return done(null, false);
        }
        return done(null, results.rows[0]);
        })


        })
    );
    };