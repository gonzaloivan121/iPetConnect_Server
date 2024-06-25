const express = require('express');

function createRouter(db, bcrypt) {
    const router = express.Router();

    // the routes are defined here

    router.post('/pet_post_comment', (req, res, next) => {
        let created_at = new Date();

        db.query(
            'INSERT INTO pet_post_comment (content, is_answer, answer_comment_id, post_id, user_id, created_at, updated_at) VALUES (?,?,?,?,?,?,?)',
            [
                req.body.content,
                req.body.is_answer,
                req.body.answer_comment_id,
                req.body.post_id,
                req.body.user_id,
                created_at,
                created_at
            ],
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ success: false, message: error });
                } else {
                    res.status(200).json({ success: true, message: 'Pet Post Comment added successfully', result, created_at });
                }
            }
        );
    });

    router.get('/pet_post_comment', function (req, res, next) {
        db.query(
            'SELECT * FROM pet_post_comment', [],
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ success: false, message: error });
                } else {
                    res.status(200).json({ success: true, result });
                }
            }
        );
    });

    router.get('/pet_post_comment/:id', function (req, res, next) {
        db.query(
            'SELECT * FROM pet_post_comment WHERE id=?',
            [req.params.id],
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ success: false, message: error });
                } else {
                    res.status(200).json({ success: true, result });
                }
            }
        );
    });

    router.get('/pet_post_comment/pet_post/:id', function (req, res, next) {
        db.query(
            'SELECT * FROM pet_post_comment WHERE post_id=? ORDER BY id DESC',
            [req.params.id],
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ success: false, message: error });
                } else {
                    res.status(200).json({ success: true, result });
                }
            }
        );
    });

    router.put('/pet_post_comment/:id', function (req, res, next) {
        let updated_at = new Date();

        db.query(
            'UPDATE pet_post_comment SET content=?, is_answer=?, answer_comment_id=?, post_id=?, user_id=?, updated_at=? WHERE id=?',
            [
                req.body.content,
                req.body.is_answer,
                req.body.answer_comment_id,
                req.body.post_id,
                req.body.user_id,
                updated_at,
                req.params.id
            ],
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ success: false, message: error });
                } else {
                    res.status(200).json({ success: true, message: 'Pet Post Comment updated successfully', result });
                }
            }
        );
    });

    router.delete('/pet_post_comment/:id', function (req, res, next) {
        db.query(
            'DELETE FROM pet_post_comment WHERE id=?',
            [req.params.id],
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ success: false, message: error });
                } else {
                    res.status(200).json({ success: true, message: 'Pet Post Comment deleted successfully', result });
                }
            }
        );
    });

    return router;
}

module.exports = createRouter;