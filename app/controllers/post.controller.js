const pool = require('../config/db.config.js')

exports.getPostById = (req, res) => {
    const PostId = req.params.PostId; // Assuming it's in the URL parameter
    
        pool.query('SELECT * FROM articles WHERE id = $1', [PostId], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
        })
    }

exports.createPost = (req, res) => {
        const userId = req.params.userId;
        const { title, body, tags, published } = req.body;
    
        // Check if required fields are provided
        if (!userId || !title || !body) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
    
        // Construct the SQL query for creating a new post
        const createQuery = `
            INSERT INTO articles (user_id, title, body, tags, published)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `;
    
        // Execute the SQL query with the provided data
        pool.query(createQuery, [userId, title, body, tags, published], (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).json({ message: 'Error creating post' });
            } else {
                res.status(201).json(results.rows[0]);
            }
        });
    };
    

    exports.updatePostById = (req, res) => {
        const postId = req.params.postId;
        const { title, body, tags, published } = req.body;
    
        // Check which fields to update
        let updateFields = [];
        let queryParams = [];
    
        if (title) {
            updateFields.push('title = $1');
            queryParams.push(title);
        }
        if (body) {
            updateFields.push('body = $2');
            queryParams.push(body);
        }
        if (tags) {
            updateFields.push('tags = $3');
            queryParams.push(tags);
        }
        if (published !== undefined) {
            updateFields.push('published = $4');
            queryParams.push(published);
        }
    
        if (updateFields.length === 0) {
            return res.status(400).json({ message: 'No valid fields to update' });
        }
    
        // Construct the SQL query dynamically
        const updateQuery = `
            UPDATE articles
            SET ${updateFields.join(', ')}
            WHERE id = $${queryParams.length + 1}
            RETURNING *
        `;
    
        // Add the postId to the end of the queryParams array
        queryParams.push(postId);
    
        // Execute the SQL query
        pool.query(updateQuery, queryParams, (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).json({ message: 'Error updating post' });
            } else if (results.rowCount === 0) {
                res.status(404).json({ message: 'Post not found' });
            } else {
                res.status(200).json(results.rows[0]);
            }
        });
    };
    

    exports.deletePostbyId = (req, res) => {
        const id = req.params.PostId;
        
        pool.query('DELETE FROM articles WHERE id = $1', [id], (error, results) => {
            if (error) {
                throw error;
            }
            res.status(200).send(`Article with ID ${id} has been deleted.`);
        });
    };