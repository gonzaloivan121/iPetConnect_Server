const express = require('express');

function createRouter(db, bcrypt) {
    const router = express.Router();

    // the routes are defined here

    router.post('/blog_comment', (req, res, next) => {
        let created_at = new Date();

        db.query(
            'INSERT INTO blog_comment (content, likes, post_id, user_id, created_at, updated_at) VALUES (?,?,?,?,?,?)',
            [
                req.body.content,
                req.body.likes,
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
                    res.status(200).json({ success: true, message: 'Blog Comment added successfully', result, created_at });
                }
            }
        );
    });

    router.get('/blog_comment', function (req, res, next) {
        db.query(
            'SELECT * FROM blog_comment', [],
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

    router.get('/blog_comment/:id', function (req, res, next) {
        db.query(
            'SELECT * FROM blog_comment WHERE id=?',
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

    router.get('/blog_comment/likes', function (req, res, next) {
        db.query(
            'SELECT * FROM blog_comment ORDER BY likes DESC', [],
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

    router.get('/blog_comment/blog_post/:id', function (req, res, next) {
        db.query(
            'SELECT * FROM blog_comment WHERE post_id=?',
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

    router.get('/blog_comment/blog_post/:id/likes', function (req, res, next) {
        db.query(
            'SELECT * FROM blog_comment WHERE post_id=? ORDER BY likes DESC',
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

    router.put('/blog_comment/:id', function (req, res, next) {
        let updated_at = new Date();

        db.query(
            'UPDATE blog_comment SET content=?, likes=?, post_id=?, user_id=?, updated_at=? WHERE id=?',
            [
                req.body.content,
                req.body.likes,
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
                    res.status(200).json({ success: true, message: 'Blog Comment updated successfully', result });
                }
            }
        );
    });

    router.delete('/blog_comment/:id', function (req, res, next) {
        db.query(
            'DELETE FROM blog_comment WHERE id=?',
            [req.params.id],
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ success: false, message: error });
                } else {
                    res.status(200).json({ success: true, message: 'Blog Comment deleted successfully', result });
                }
            }
        );
    });

    return router;
}

module.exports = createRouter;