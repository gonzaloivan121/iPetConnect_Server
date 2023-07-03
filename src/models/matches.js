const express = require('express');

function createRouter(db) {
    const router = express.Router();

    // the routes are defined here

    router.post('/match', (req, res, next) => {
        let created_at = new Date();
        db.query(
            'INSERT INTO `match` (user1_id, user2_id, created_at, updated_at) VALUES (?,?,?,?)',
            [
                req.body.user1_id,
                req.body.user2_id,
                created_at,
                created_at
            ],
            (error) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ status: 'error', message: error });
                } else {
                    res.status(200).json({ status: 'success', message: 'Match added successfully' });
                }
            }
        );
    });

    router.get('/match', function (req, res, next) {
        db.query(
            'SELECT * FROM `match`', [],
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

    router.get('/match/:id', function (req, res, next) {
        db.query(
            'SELECT * FROM `match` WHERE id=?',
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

    router.get('/match/user/:id', function (req, res, next) {
        db.query(
            'SELECT * FROM `match` WHERE user1_id=? OR user2_id=?',
            [
                req.params.id,
                req.params.id
            ],
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

    router.put('/match/:id', function (req, res, next) {
        let updated_at = new Date();
        db.query(
            'UPDATE `match` SET user1_id=?, user2_id=?, updated_at=? WHERE id=?',
            [
                req.body.user1_id,
                req.body.user2_id,
                updated_at,
                req.params.id
            ],
            (error) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ status: 'error', message: error });
                } else {
                    res.status(200).json({ status: 'success', message: 'Match updated successfully' });
                }
            }
        );
    });

    router.delete('/match/:id', function (req, res, next) {
        db.query(
            'DELETE FROM `match` WHERE id=?',
            [req.params.id],
            (error) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ status: 'error', message: error });
                } else {
                    res.status(200).json({ status: 'success', message: 'Match deleted successfully' });
                }
            }
        );
    });

    return router;
}

module.exports = createRouter;