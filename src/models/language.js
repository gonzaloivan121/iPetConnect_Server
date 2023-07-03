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
            (error) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ status: 'error', message: error });
                } else {
                    res.status(200).json({ status: 'success', message: 'Language added successfully' });
                }
            }
        );
    });

    router.get('/language', function (req, res, next) {
        db.query(
            'SELECT * FROM language', [],
            (error, results) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ status: 'error', message: error });
                } else {
                    res.status(200).json({ status: 'success', results});
                }
            }
        );
    });

    router.get('/language/:id', function (req, res, next) {
        db.query(
            'SELECT * FROM language WHERE id=?',
            [req.params.id],
            (error, results) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ status: 'error', message: error });
                } else {
                    res.status(200).json({ status: 'success', results });
                }
            }
        );
    });

    router.get('/language/code/:code', function (req, res, next) {
        db.query(
            'SELECT * FROM language WHERE code=?',
            [req.params.code],
            (error, results) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ status: 'error', message: error });
                } else {
                    res.status(200).json({ status: 'success', results });
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
            (error) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ status: 'error', message: error });
                } else {
                    res.status(200).json({ status: 'success', message: 'Language updated successfully' });
                }
            }
        );
    });

    router.delete('/language/:id', function (req, res, next) {
        db.query(
            'DELETE FROM language WHERE id=?',
            [req.params.id],
            (error) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ status: 'error', message: error });
                } else {
                    res.status(200).json({ status: 'success', message: 'Language deleted successfully' });
                }
            }
        );
    });

    return router;
}

module.exports = createRouter;