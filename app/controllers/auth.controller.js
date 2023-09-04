const pool = require('../config/db.config.js')
const uuid = require('uuid')
const config = require('../config/auth.config.js')
const crypto = require('crypto')
const { authentication, random } = require('../helpers')

// Registration
exports.register = async (req, res) => {
    const role = 'visitor'
    const { username, email, password } = req.body;

    // check if the username , email , password is present 
    if(!username||!email||!password){
        return res.sendStatus(400)
    }

    // check if the user is already register
    pool.query('SELECT * FROM users WHERE email = $1', [email], (error, results) => {
        if (results.rowCount > 0) {
            return res.sendStatus(400).json({message:'user already register'})
        }
        })

    const salt = random();

    try {
            pool.query('INSERT INTO users (username, email,id,password,role,salt) VALUES ($1, $2,$3,$4,$5,$6) RETURNING *', [username, email,uuid.v4(),authentication(salt, password),role,salt], (error, results) => {
            if (error) {
                throw error
            }
            res.status(201).json(`User added with ID: ${results.rows[0].id}`)
            })

    } catch (error) {
        res.status(400).json({ message: 'Error registering user' });
    }
};

// Login
exports.login = async (req, res) => {
    const {  email , password } = req.body;
    const refreshToken = crypto.randomBytes(64).toString('hex');

    // check if the email and password is present 
    if(!email||!password){
        return res.sendStatus(400)
    }
    try {
        pool.query('SELECT * FROM users WHERE email = $1', [email], (error, results) => {
            if (results.rowCount <1) {
                res.status(400).send({message:'user not found'})
            }
            const expectedHash = authentication(results.rows[0].salt, password);

            if (results.rows[0].password != expectedHash) {
                return res.sendStatus(403);
                }
            
            const salt = random();
            const sessionToken = authentication(salt, results.rows[0].id);

            pool.query('UPDATE users SET sessionToken = $1 WHERE id = $2 RETURNING *', [sessionToken,results.rows[0].id], (error, results) => {
                    if (error) {
                        throw error
                    }
                    })
            res.cookie('LUCAS-AUTH', sessionToken, { domain: 'localhost', path: '/' });

                    res.status(200).send({
                        id: results.rows[0].id,
                        username: results.rows[0].username,
                        email: results.rows[0].email,
                        roles: results.rows[0].role,
                        sessionToken: sessionToken
                        });
        
        })
        
    } catch (error) {
        res.status(500).send({ message: error.message });

    }    
};

exports.logout = async (req, res) => {
    const { refreshToken } = req.body;
    try {
        pool.query('SELECT * FROM users WHERE refreshToken = $1', [refreshToken], (error, results) => {
            if (results.rowCount > 0) {
                return res.status(403).json({ message: "Invalid refresh token" });
            }else{
                pool.query('UPDATE users SET refreshToken = $1 WHERE id = $2 RETURNING *', [null,results.rows[0].id], (error, results) => {
                    if (error) {
                        throw error
                    }
                    })
            }
            })
    } catch (error) {
        console.error(error)
    }
};

// exports.Refresh = async (req, res) =>{
//     const { refreshToken } = req.body;
//     pool.query('SELECT * FROM users WHERE refresToken = $1', [refreshToken], (error, results) => {
//         if (results.rowCount > 0) {
//             return res.status(403).json({ message: "Invalid refresh token" });
//             return;
//         }else{
//             const newToken = jwt.sign(
//                 { username: user.username },
//                 process.env.JWT_SECRET,
//                 { expiresIn: "1h" }
//             );
//             res.json({ message: "New access token generated", token: newToken });
//         }
//         })
    
// }
