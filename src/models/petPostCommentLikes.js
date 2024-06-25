const express = require('express');

function createRouter(db, bcrypt) {
    const router = express.Router();

    // the routes are defined here

    router.post('/pet_post_comment_user_like', (req, res, next) => {
        let created_at = new Date();

        db.query(
            'INSERT INTO pet_post_comment_user_like (comment_id, user_id, created_at, updated_at) VALUES (?,?,?,?)',
            [
                req.body.comment_id,
                req.body.user_id,
                created_at,
                created_at
            ],
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ success: false, message: error });
                } else {
                    res.status(200).json({ success: true, message: 'Pet Post Comment User Like added successfully', result, created_at });
                }
            }
        );
    });

    router.get('/pet_post_comment_user_like', function (req, res, next) {
        db.query(
            'SELECT * FROM pet_post_comment_user_like', [],
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

    router.get('/pet_post_comment_user_like/:id', function (req, res, next) {
        db.query(
            'SELECT * FROM pet_post_comment_user_like WHERE id=?',
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

    router.get('/pet_post_comment_user_like/pet_post_comment/:id', function (req, res, next) {
        db.query(
            'SELECT * FROM pet_post_comment_user_like WHERE comment_id=?',
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

    router.get('/pet_post_comment_user_like/user/:id', function (req, res, next) {
        db.query(
            'SELECT * FROM pet_post_comment_user_like WHERE user_id=?',
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

    router.put('/pet_post_comment_user_like/:id', function (req, res, next) {
        let updated_at = new Date();

        db.query(
            'UPDATE pet_post_comment_user_like SET comment_id=?, user_id=?, updated_at=? WHERE id=?',
            [
                req.body.comment_id,
                req.body.user_id,
                updated_at,
                req.params.id
            ],
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ success: false, message: error });
                } else {
                    res.status(200).json({ success: true, message: 'Pet Post Comment User Like updated successfully', result });
                }
            }
        );
    });

    router.delete('/pet_post_comment_user_like/:id', function (req, res, next) {
        db.query(
            'DELETE FROM pet_post_comment_user_like WHERE id=?',
            [req.params.id],
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ success: false, message: error });
                } else {
                    res.status(200).json({ success: true, message: 'Pet Post Comment User Like deleted successfully', result });
                }
            }
        );
    });

    router.delete('/pet_post_comment_user_like/pet_post_comment/user/:id1/:id2', function (req, res, next) {
        db.query(
            'DELETE FROM pet_post_comment_user_like WHERE comment_id=? AND user_id=?',
            [
                req.params.id1,
                req.params.id2,
            ],
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ success: false, message: error });
                } else {
                    res.status(200).json({ success: true, message: 'Pet Post Comment User Like deleted successfully', result });
                }
            }
        );
    });

    return router;
}

module.exports = createRouter;