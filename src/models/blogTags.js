const express = require('express');

function createRouter(db, bcrypt) {
    const router = express.Router();

    // the routes are defined here

    router.post('/blog_tag', (req, res, next) => {
        let created_at = new Date();

        db.query(
            'INSERT INTO blog_tag (name, created_at, updated_at) VALUES (?,?,?)',
            [
                req.body.name,
                created_at,
                created_at
            ],
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ success: false, message: error });
                } else {
                    res.status(200).json({ success: true, message: 'Blog Tag added successfully', result, created_at });
                }
            }
        );
    });

    router.get('/blog_tag', function (req, res, next) {
        db.query(
            'SELECT * FROM blog_tag', [],
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

    router.get('/blog_tag/:id', function (req, res, next) {
        db.query(
            'SELECT * FROM blog_tag WHERE id=?',
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

    router.put('/blog_tag/:id', function (req, res, next) {
        let updated_at = new Date();

        db.query(
            'UPDATE blog_tag SET name=?, updated_at=? WHERE id=?',
            [
                req.body.name,
                updated_at,
                req.params.id
            ],
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ success: false, message: error });
                } else {
                    res.status(200).json({ success: true, message: 'Blog Tag updated successfully', result });
                }
            }
        );
    });

    router.delete('/blog_tag/:id', function (req, res, next) {
        db.query(
            'DELETE FROM blog_tag WHERE id=?',
            [req.params.id],
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ success: false, message: error });
                } else {
                    res.status(200).json({ success: true, message: 'Blog Tag deleted successfully', result });
                }
            }
        );
    });

    return router;
}

module.exports = createRouter;