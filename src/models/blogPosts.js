const express = require('express');

function createRouter(db, bcrypt) {
    const router = express.Router();

    // the routes are defined here

    router.post('/blog_post', (req, res, next) => {
        let created_at = new Date();

        db.query(
            'INSERT INTO blog_post (title, content, image, category_id, user_id, created_at, updated_at) VALUES (?,?,?,?,?,?,?)',
            [
                req.body.title,
                req.body.content,
                req.body.image,
                req.body.category_id,
                req.body.user_id,
                created_at,
                created_at
            ],
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ success: false, message: error });
                } else {
                    res.status(200).json({ success: true, message: 'Blog Post added successfully', result });
                }
            }
        );
    });

    router.get('/blog_post', function (req, res, next) {
        db.query(
            'SELECT * FROM blog_post', [],
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

    router.get('/blog_post/latest', function (req, res, next) {
        db.query(
            'SELECT * FROM blog_post ORDER BY id DESC', [],
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

    router.get('/blog_post/popularity', function (req, res, next) {
        db.query(
            'SELECT * FROM blog_post ORDER BY popularity DESC', [],
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

    router.get('/blog_post/:id', function (req, res, next) {
        db.query(
            'SELECT * FROM blog_post WHERE id=?',
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

    router.get('/blog_post/blog_category/:id', function (req, res, next) {
        db.query(
            'SELECT * FROM blog_post WHERE category_id=?',
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

    router.get('/blog_post/blog_category/:id/popularity', function (req, res, next) {
        db.query(
            'SELECT * FROM blog_post WHERE category_id=? ORDER BY popularity DESC',
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

    router.put('/blog_post/:id', function (req, res, next) {
        let updated_at = new Date();

        db.query(
            'UPDATE blog_post SET title=?, content=?, image=?, popularity=?, category_id=?, user_id=?, updated_at=? WHERE id=?',
            [
                req.body.title,
                req.body.content,
                req.body.image,
                req.body.popularity,
                req.body.category_id,
                req.body.user_id,
                updated_at,
                req.params.id
            ],
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ success: false, message: error });
                } else {
                    res.status(200).json({ success: true, message: 'Blog Post updated successfully', result });
                }
            }
        );
    });

    router.delete('/blog_post/:id', function (req, res, next) {
        db.query(
            'DELETE FROM blog_post WHERE id=?',
            [req.params.id],
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ success: false, message: error });
                } else {
                    res.status(200).json({ success: true, message: 'Blog Post deleted successfully', result });
                }
            }
        );
    });

    return router;
}

module.exports = createRouter;