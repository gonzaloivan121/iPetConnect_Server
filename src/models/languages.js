const express = require('express');

function createRouter(db) {
    const router = express.Router();

    // the routes are defined here

    router.post('/language', (req, res, next) => {
        let created_at = new Date();
        db.query(
            'INSERT INTO language (code, name, created_at, updated_at) VALUES (?,?,?,?)',
            [
                req.body.code,
                req.body.name,
                created_at,
                created_at
            ],
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ success: false, message: error });
                } else {
                    res.status(200).json({ success: true, message: 'Language added successfully', result });
                }
            }
        );
    });

    router.get('/language', function (req, res, next) {
        db.query(
            'SELECT * FROM language', [],
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

    router.get('/language/:id', function (req, res, next) {
        db.query(
            'SELECT * FROM language WHERE id=?',
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

    router.get('/language/code/:code', function (req, res, next) {
        db.query(
            'SELECT * FROM language WHERE code=?',
            [req.params.code],
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

    router.put('/language/:id', function (req, res, next) {
        let updated_at = new Date();
        db.query(
            'UPDATE language SET code=?, name=?, updated_at=? WHERE id=?',
            [
                req.body.code,
                req.body.name,
                updated_at,
                req.params.id
            ],
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ success: false, message: error });
                } else {
                    res.status(200).json({ success: true, message: 'Language updated successfully', result });
                }
            }
        );
    });

    router.delete('/language/:id', function (req, res, next) {
        db.query(
            'DELETE FROM language WHERE id=?',
            [req.params.id],
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ success: false, message: error });
                } else {
                    res.status(200).json({ success: true, message: 'Language deleted successfully', result });
                }
            }
        );
    });

    return router;
}

module.exports = createRouter;