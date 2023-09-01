var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
const pool = require('../config/db.config.js')
const uuid = require('uuid')
const config = require('../config/auth.config.js')
const crypto = require('crypto')
// Registration
exports.register = async (req, res) => {
    const role = 'visitor'
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8)
    try {
            pool.query('INSERT INTO users (username, email,id,password,role) VALUES ($1, $2,$3,$4,$5) RETURNING *', [username, email,uuid.v4(),hashedPassword,role], (error, results) => {
            if (error) {
                throw error
            }
            res.status(201).json(`User added with ID: ${results.rows[0].id}`)
            })

    } catch (error) {
        res.status(500).json({ message: 'Error registering user' });
    }
};

// Login
exports.login = async (req, res) => {
    const {  email , password } = req.body;
    const refreshToken = crypto.randomBytes(64).toString('hex');

    try {
        pool.query('SELECT * FROM users WHERE email = $1', [email], (error, results) => {
            if (error) {
                res.status(400).send({message:'user not found'})
            }
            var passwordIsValid = bcrypt.compare(
                password,
                results.rows[0].password
                );
            if (!passwordIsValid) {
                        return res.status(401).send({
                        accessToken: null,
                        message: "Invalid Password!"
                        });

                }

                const token = jwt.sign({ id: results.rows[0].id },
                    config.secret,
                    {
                        algorithm: 'HS256',
                        allowInsecureKeySizes: true,
                        expiresIn: "1h", // 24 hours
                    });
                    pool.query('UPDATE users SET refreshToken = $1 WHERE id = $2 RETURNING *', [refreshToken,results.rows[0].id], (error, results) => {
                    if (error) {
                        throw error
                    }
                    })

                    res.status(200).send({
                        id: results.rows[0].id,
                        username: results.rows[0].username,
                        email: results.rows[0].email,
                        roles: results.rows[0].role,
                        accessToken: token
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

exports.Refresh = async (req, res) =>{
    const { refreshToken } = req.body;
    pool.query('SELECT * FROM users WHERE refresToken = $1', [refreshToken], (error, results) => {
        if (results.rowCount > 0) {
            return res.status(403).json({ message: "Invalid refresh token" });
            return;
        }else{
            const newToken = jwt.sign(
                { username: user.username },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );
            res.json({ message: "New access token generated", token: newToken });
        }
        })
    
}
