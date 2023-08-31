const pool = require('../config/db.config.js')

const checkDuplicateEmail = (req, res, next) => {
        // Username
        const {  email } = req.body
        pool.query('SELECT * FROM users WHERE email = $1', [email], (error, results) => {
            if (results.rowCount > 0) {
                res.status(300).json({message:'user already register'})
                return;
            }else{
                next();
            }
            })
    
            
        }
        
module.exports = checkDuplicateEmail;
