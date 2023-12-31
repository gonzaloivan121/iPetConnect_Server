const express = require('express');

function createRouter(db) {
    const router = express.Router();

    // the routes are defined here

    router.post('/message', (req, res, next) => {
        let created_at = new Date();
        db.query(
            'INSERT INTO message (chat_id, user_id, message, edited, `read`, created_at, updated_at) VALUES (?,?,?,?,?,?,?)',
            [
                req.body.chat_id,
                req.body.user_id,
                req.body.message,
                false,
                false,
                created_at,
                created_at
            ],
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ success: false, message: error });
                } else {
                    res.status(200).json({ success: true, message: 'Message added successfully', result, created_at });
                }
            }
        );
    });

    router.get('/message', function (req, res, next) {
        db.query(
            'SELECT * FROM message', [],
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

    router.get('/message/:id', function (req, res, next) {
        db.query(
            'SELECT * FROM message WHERE id=?',
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

    router.get('/message/chat/:id', function (req, res, next) {
        db.query(
            'SELECT * FROM message WHERE chat_id=?',
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

    router.put('/message/:id', function (req, res, next) {
        let updated_at = new Date();
        db.query(
            'UPDATE message SET message=?, edited=?, `read`=?, updated_at=? WHERE id=?',
            [
                req.body.message,
                req.body.edited,
                req.body.read,
                updated_at,
                req.params.id
            ],
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ success: false, message: error });
                } else {
                    res.status(200).json({ success: true, message: 'Message updated successfully', result });
                }
            }
        );
    });

    router.delete('/message/:id', function (req, res, next) {
        db.query(
            'DELETE FROM message WHERE id=?',
            [req.params.id],
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ success: false, message: error });
                } else {
                    res.status(200).json({ success: true, message: 'Message deleted successfully', result });
                }
            }
        );
    });

    return router;
}

module.exports = createRouter;