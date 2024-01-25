const express = require('express');

function createRouter(db) {
    const router = express.Router();

    // the routes are defined here

    router.post('/user_report', (req, res, next) => {
        let created_at = new Date();
        db.query(
            'INSERT INTO user_report (reason, user_id, created_at, updated_at) VALUES (?,?,?,?)',
            [
                req.body.reason,
                req.body.user_id,
                created_at,
                created_at
            ],
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ success: false, message: error });
                } else {
                    res.status(200).json({ success: true, message: 'User Report added successfully', result, created_at });
                }
            }
        );
    });

    router.get('/user_report', function (req, res, next) {
        db.query(
            'SELECT * FROM user_report', [],
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

    router.get('/user_report/:id', function (req, res, next) {
        db.query(
            'SELECT * FROM user_report WHERE id=?',
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

    router.get('/user_report/user/:id', function (req, res, next) {
        db.query(
            'SELECT * FROM user_report WHERE user_id=?',
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

    router.put('/user_report/:id', function (req, res, next) {
        let updated_at = new Date();
        db.query(
            'UPDATE user_report SET reason=?, user_id=?, updated_at=? WHERE id=?',
            [
                req.body.reason,
                req.body.user_id,
                updated_at,
                req.params.id
            ],
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ success: false, message: error });
                } else {
                    res.status(200).json({ success: true, message: 'User Report updated successfully', result });
                }
            }
        );
    });

    router.delete('/user_report/:id', function (req, res, next) {
        db.query(
            'DELETE FROM user_report WHERE id=?',
            [req.params.id],
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ success: false, message: error });
                } else {
                    res.status(200).json({ success: true, message: 'User Report deleted successfully', result });
                }
            }
        );
    });

    return router;
}

module.exports = createRouter;