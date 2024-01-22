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
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ success: false, message: error });
                } else {
                    res.status(200).json({ success: true, message: 'Match added successfully', result });
                }
            }
        );
    });

    router.get('/match', function (req, res, next) {
        db.query(
            'SELECT * FROM `match`', [],
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

    router.get('/match/:id', function (req, res, next) {
        db.query(
            'SELECT * FROM `match` WHERE id=?',
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

    router.get('/match/user/:id', function (req, res, next) {
        db.query(
            'SELECT * FROM `match` WHERE user1_id=? OR user2_id=?',
            [
                req.params.id,
                req.params.id
            ],
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

    router.get('/match/user/:id1/:id2', function (req, res, next) {
        db.query(
            'SELECT * FROM `match` WHERE (user1_id=? AND user2_id=?) OR (user1_id=? AND user2_id=?)',
            [
                req.params.id1,
                req.params.id2,
                req.params.id2,
                req.params.id1
            ],
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
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ success: false, message: error });
                } else {
                    res.status(200).json({ success: true, message: 'Match updated successfully', result });
                }
            }
        );
    });

    router.delete('/match/:id', function (req, res, next) {
        db.query(
            'DELETE FROM `match` WHERE id=?',
            [req.params.id],
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ success: false, message: error });
                } else {
                    res.status(200).json({ success: true, message: 'Match deleted successfully', result });
                }
            }
        );
    });

    return router;
}

module.exports = createRouter;