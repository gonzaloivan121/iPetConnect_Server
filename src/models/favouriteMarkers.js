const express = require('express');

function createRouter(db) {
    const router = express.Router();

    // the routes are defined here

    router.post('/favourite_marker', (req, res, next) => {
        let created_at = new Date();
        db.query(
            'INSERT INTO favourite_marker (user_id, marker_id, created_at, updated_at) VALUES (?,?,?,?)',
            [
                req.body.user_id,
                req.body.marker_id,
                created_at,
                created_at
            ],
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ success: false, message: error });
                } else {
                    res.status(200).json({ success: true, message: 'Favourite marker added successfully', result });
                }
            }
        );
    });

    router.get('/favourite_marker', function (req, res, next) {
        db.query(
            'SELECT * FROM favourite_marker', [],
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

    router.get('/favourite_marker/:id', function (req, res, next) {
        db.query(
            'SELECT * FROM favourite_marker WHERE id=?',
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

    router.get('/favourite_marker/user/:id', function (req, res, next) {
        db.query(
            'SELECT m.* FROM marker m RIGHT JOIN favourite_marker fm ON m.id = fm.marker_id WHERE fm.user_id=?',
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

    router.get('/favourite_marker/user/marker/:idu/:idm', function (req, res, next) {
        db.query(
            'SELECT * FROM favourite_marker WHERE user_id=? AND marker_id=?',
            [
                req.params.idu,
                req.params.idm
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

    router.get('/favourite_marker/marker/:id', function (req, res, next) {
        db.query(
            'SELECT * FROM favourite_marker WHERE marker_id=?',
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

    router.put('/favourite_marker/:id', function (req, res, next) {
        let updated_at = new Date();
        db.query(
            'UPDATE like SET user_id=?, marker_id=?, updated_at=? WHERE id=?',
            [
                req.body.user_id,
                req.body.marker_id,
                updated_at,
                req.params.id
            ],
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ success: false, message: error });
                } else {
                    res.status(200).json({ success: true, message: 'Favourite marker updated successfully', result });
                }
            }
        );
    });

    router.delete('/favourite_marker/:id', function (req, res, next) {
        db.query(
            'DELETE FROM favourite_marker WHERE id=?',
            [req.params.id],
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ success: false, message: error });
                } else {
                    res.status(200).json({ success: true, message: 'Favourite marker deleted successfully', result });
                }
            }
        );
    });

    return router;
}

module.exports = createRouter;