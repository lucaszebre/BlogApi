const pool = require('../config/db.config.js')

exports.getComment = (req, res) => {
    const PostId = req.params.postId; // Assuming it's in the URL parameter
    
        pool.query('SELECT * FROM comments WHERE article_id = $1', [PostId], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
        })
    }

exports.createComment = (req, res) => {
        const userId = req.params.userId;
        const postId = req.params.postId;
        const {  body } = req.body;
    
        // Check if required fields are provided
        if ( !body) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
    
        // Construct the SQL query for creating a new post
        const createQuery = `
            INSERT INTO comments (user_id,  body, article_id)
            VALUES ($1, $2, $3)
            RETURNING *
        `;
    
        // Execute the SQL query with the provided data
        pool.query(createQuery, [userId, body, postId], (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).json({ message: 'Error creating post' });
            } else {
                res.status(201).json(results.rows[0]);
            }
        });
    };
    

    exports.updateComment = (req, res) => {
        const commentId = req.params.commentId;
        const { body } = req.body;
    
        // Check which fields to update
        let updateFields = [];
        let queryParams = [];
        if (body) {
            updateFields.push('body = $1');
            queryParams.push(body);
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
    
        // Add the commentId to the end of the queryParams array
        queryParams.push(commentId);
    
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
    

    exports.deleteComment= (req, res) => {
        const id = req.params.PostId;
        
        pool.query('DELETE FROM articles WHERE id = $1', [id], (error, results) => {
            if (error) {
                throw error;
            }
            res.status(200).send(`Article with ID ${id} has been deleted.`);
        });
    };