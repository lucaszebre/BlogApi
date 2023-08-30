const pool = require('../config/db.js')


exports.getUserById = (req, res) => {
    const id = parseInt(req.params.userId)
    
        pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
        })
    }

exports.createUser = (req, res) => {
    const { username, email } = req.body
    Id=1
        pool.query('INSERT INTO users (username, email,Id) VALUES ($1, $2,$3) RETURNING *', [username, email,Id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(201).send(`User added with ID: ${results.rows[0].id}`)
        })
    }

    