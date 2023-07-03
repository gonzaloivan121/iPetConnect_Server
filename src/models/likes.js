const express = require('express');

function createRouter(db) {
    const router = express.Router();

    // the routes are defined here

    router.post('/like', (req, res, next) => {
        let created_at = new Date();
        db.query(
            'INSERT INTO `like` (user1_id, user2_id, created_at, updated_at) VALUES (?,?,?,?)',
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
                    res.status(200).json({ status: 'success', message: 'Like added successfully' });
                }
            }
        );
    });

    router.get('/like', function (req, res, next) {
        db.query(
            'SELECT * FROM `like`', [],
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

    router.get('/like/:id', function (req, res, next) {
        db.query(
            'SELECT * FROM `like` WHERE id=?',
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

    router.get('/like/user_1/:id', function (req, res, next) {
        db.query(
            'SELECT * FROM `like` WHERE user1_id=?',
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

    router.get('/like/user_2/:id', function (req, res, next) {
        db.query(
            'SELECT * FROM `like` WHERE user2_id=?',
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

    router.put('/like/:id', function (req, res, next) {
        let updated_at = new Date();
        db.query(
            'UPDATE `like` SET user1_id=?, user2_id=?, updated_at=? WHERE id=?',
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
                    res.status(200).json({ status: 'success', message: 'Like updated successfully' });
                }
            }
        );
    });

    router.delete('/like/:id', function (req, res, next) {
        db.query(
            'DELETE FROM `like` WHERE id=?',
            [req.params.id],
            (error) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ status: 'error', message: error });
                } else {
                    res.status(200).json({ status: 'success', message: 'Like deleted successfully' });
                }
            }
        );
    });

    return router;
}

module.exports = createRouter;