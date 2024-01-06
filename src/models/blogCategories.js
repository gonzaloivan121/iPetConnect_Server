const express = require('express');

function createRouter(db, bcrypt) {
    const router = express.Router();

    // the routes are defined here

    router.post('/blog_category', (req, res, next) => {
        let created_at = new Date();

        db.query(
            'INSERT INTO blog_category (name, description, image, created_at, updated_at) VALUES (?,?,?,?,?)',
            [
                req.body.name,
                req.body.description,
                req.body.image,
                created_at,
                created_at
            ],
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ success: false, message: error });
                } else {
                    res.status(200).json({ success: true, message: 'Blog Category added successfully', result });
                }
            }
        );
    });

    router.get('/blog_category', function (req, res, next) {
        db.query(
            'SELECT * FROM blog_category', [],
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

    router.get('/blog_category/latest/:number', function (req, res, next) {
        db.query(
            'SELECT * FROM blog_category ORDER BY id DESC LIMIT ?',
            [Number(req.params.number)],
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

    router.get('/blog_category/:id', function (req, res, next) {
        db.query(
            'SELECT * FROM blog_category WHERE id=?',
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

    router.put('/blog_category/:id', function (req, res, next) {
        let updated_at = new Date();

        db.query(
            'UPDATE blog_category SET name=?, description=?, image=?, updated_at=? WHERE id=?',
            [
                req.body.name,
                req.body.description,
                req.body.image,
                updated_at,
                req.params.id
            ],
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ success: false, message: error });
                } else {
                    res.status(200).json({ success: true, message: 'Blog Category updated successfully', result });
                }
            }
        );
    });

    router.delete('/blog_category/:id', function (req, res, next) {
        db.query(
            'DELETE FROM blog_category WHERE id=?',
            [req.params.id],
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ success: false, message: error });
                } else {
                    res.status(200).json({ success: true, message: 'Blog Category deleted successfully', result });
                }
            }
        );
    });

    return router;
}

module.exports = createRouter;