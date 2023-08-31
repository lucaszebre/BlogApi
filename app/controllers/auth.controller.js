var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
const pool = require('../config/db.config.js')
const uuid = require('uuid')
const config = require('../config/auth.config.js')
// Registration
exports.register = async (req, res) => {
    const id = uuid.v4()
    const role = 'visitor'
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8)
    try {
            pool.query('INSERT INTO users (username, email,id,password,role) VALUES ($1, $2,$3,$4,$5) RETURNING *', [username, email,id,hashedPassword,role], (error, results) => {
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
    const hashedPassword = bcrypt.hashSync(password, 8)

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
                        expiresIn: 86400, // 24 hours
                    });

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

// exports.logout = async (req, res) => {
//     try {
//         fire.auth().signOut().then(() => {
//             res.redirect('/login');
//             }).catch((error) => {
//             console.error(error)
//             })
//     } catch (error) {
        
//     }
// };
