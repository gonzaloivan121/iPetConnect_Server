const express = require('express');

function createRouter(db) {
    const router = express.Router();

    // the routes are defined here

    router.post('/chat', (req, res, next) => {
        let created_at = new Date();
        db.query(
            'INSERT INTO chat (user1_id, user2_id, epoch, created_at, updated_at) VALUES (?,?,?,?,?)',
            [
                req.body.user1_id,
                req.body.user2_id,
                req.body.epoch,
                created_at,
                created_at
            ],
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ success: false, message: error });
                } else {
                    res.status(200).json({ success: true, message: 'Chat added successfully', result });
                }
            }
        );
    });

    router.get('/chat', function (req, res, next) {
        db.query(
            'SELECT * FROM chat', [],
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

    router.get('/chat/:id', function (req, res, next) {
        db.query(
            'SELECT * FROM chat WHERE id=?',
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

    router.get('/chat/user/:id', function (req, res, next) {
        db.query(
            'SELECT * FROM chat WHERE user1_id=? OR user2_id=?',
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

    router.put('/chat/:id', function (req, res, next) {
        let updated_at = new Date();
        db.query(
            'UPDATE chat user1_id=?, user2_id=?, epoch=?, updated_at=? WHERE id=?',
            [
                req.body.user1_id,
                req.body.user2_id,
                req.body.epoch,
                updated_at,
                req.params.id
            ],
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ success: false, message: error });
                } else {
                    res.status(200).json({ success: true, message: 'Chat updated successfully', result });
                }
            }
        );
    });

    router.delete('/chat/:id', function (req, res, next) {
        db.query(
            'DELETE FROM chat WHERE id=?',
            [req.params.id],
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ success: false, message: error });
                } else {
                    res.status(200).json({ success: true, message: 'Chat deleted successfully', result });
                }
            }
        );
    });

    return router;
}

module.exports = createRouter;