const express = require('express');

function createRouter(db) {
    const router = express.Router();

    // the routes are defined here

    router.post('/config', (req, res, next) => {
        let created_at = new Date();
        db.query(
            'INSERT INTO config (min_distance, max_distance, selected_gender, min_age, max_age, search_verified_users, search_in_distance, search_in_age, search_has_bio, user_id, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
            [
                req.body.min_distance,
                req.body.max_distance,
                req.body.selected_gender,
                req.body.min_age,
                req.body.max_age,
                req.body.search_verified_users,
                req.body.search_in_distance,
                req.body.search_in_age,
                req.body.search_has_bio,
                req.body.user_id,
                created_at,
                created_at
            ],
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ success: false, message: error });
                } else {
                    res.status(200).json({ success: true, message: 'Config added successfully', result });
                }
            }
        );
    });

    router.get('/config', function (req, res, next) {
        db.query(
            'SELECT * FROM config', [],
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

    router.get('/config/:id', function (req, res, next) {
        db.query(
            'SELECT * FROM config WHERE id=?',
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

    router.get('/config/user/:id', function (req, res, next) {
        db.query(
            'SELECT * FROM config WHERE user_id=?',
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

    router.put('/config/:id', function (req, res, next) {
        let updated_at = new Date();
        db.query(
            'UPDATE config SET min_distance=?, max_distance=?, selected_gender=?, min_age=?, max_age=?, search_verified_users=?, search_in_distance=?, search_in_age=?, search_has_bio=?, updated_at=? WHERE id=?',
            [
                req.body.min_distance,
                req.body.max_distance,
                req.body.selected_gender,
                req.body.min_age,
                req.body.max_age,
                req.body.search_verified_users,
                req.body.search_in_distance,
                req.body.search_in_age,
                req.body.search_has_bio,
                updated_at,
                req.params.id
            ],
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ success: false, message: error });
                } else {
                    res.status(200).json({ success: true, message: 'Config updated successfully', result });
                }
            }
        );
    });

    router.put('/config/user/:user_id', function (req, res, next) {
        let updated_at = new Date();
        db.query(
            'UPDATE config SET min_distance=?, max_distance=?, selected_gender=?, min_age=?, max_age=?, search_verified_users=?, search_in_distance=?, search_in_age=?, search_has_bio=?, updated_at=? WHERE user_id=?',
            [
                req.body.min_distance,
                req.body.max_distance,
                req.body.selected_gender,
                req.body.min_age,
                req.body.max_age,
                req.body.search_verified_users,
                req.body.search_in_distance,
                req.body.search_in_age,
                req.body.search_has_bio,
                updated_at,
                req.params.user_id
            ],
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ success: false, message: error });
                } else {
                    res.status(200).json({ success: true, message: 'Config updated successfully', result });
                }
            }
        );
    });

    router.delete('/config/:id', function (req, res, next) {
        db.query(
            'DELETE FROM config WHERE id=?',
            [req.params.id],
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ success: false, message: error });
                } else {
                    res.status(200).json({ success: true, message: 'Config deleted successfully', result });
                }
            }
        );
    });

    return router;
}

module.exports = createRouter;