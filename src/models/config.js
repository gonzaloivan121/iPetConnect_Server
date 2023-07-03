const express = require('express');

function createRouter(db) {
    const router = express.Router();

    // the routes are defined here

    router.post('/config', (req, res, next) => {
        let created_at = new Date();
        db.query(
            'INSERT INTO config (min_distance, max_distance, selected_gender, min_age, max_age, search_verified_users, search_in_distance, search_in_age, search_has_bio, language, user_id, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)',
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
                req.body.language,
                req.body.user_id,
                created_at,
                created_at
            ],
            (error) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ status: 'error', message: error });
                } else {
                    res.status(200).json({ status: 'success', message: 'Config added successfully' });
                }
            }
        );
    });

    router.get('/config', function (req, res, next) {
        db.query(
            'SELECT * FROM config', [],
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

    router.get('/config/:id', function (req, res, next) {
        db.query(
            'SELECT * FROM config WHERE id=?',
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

    router.get('/config/user/:id', function (req, res, next) {
        db.query(
            'SELECT * FROM config WHERE user_id=?',
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

    router.put('/config/:id', function (req, res, next) {
        let updated_at = new Date();
        db.query(
            'UPDATE config SET min_distance=?, max_distance=?, selected_gender=?, min_age=?, max_age=?, search_verified_users=?, search_in_distance=?, search_in_age=?, search_has_bio=?, language=?, updated_at=? WHERE id=?',
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
                req.body.language,
                updated_at,
                req.params.id
            ],
            (error) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ status: 'error', message: error });
                } else {
                    res.status(200).json({ status: 'success', message: 'Config updated successfully' });
                }
            }
        );
    });

    router.put('/config/user/:user_id', function (req, res, next) {
        let updated_at = new Date();
        db.query(
            'UPDATE config SET min_distance=?, max_distance=?, selected_gender=?, min_age=?, max_age=?, search_verified_users=?, search_in_distance=?, search_in_age=?, search_has_bio=?, language=?, updated_at=? WHERE user_id=?',
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
                req.body.language,
                updated_at,
                req.params.user_id
            ],
            (error) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ status: 'error', message: error });
                } else {
                    res.status(200).json({ status: 'success', message: 'Config updated successfully' });
                }
            }
        );
    });

    router.delete('/config/:id', function (req, res, next) {
        db.query(
            'DELETE FROM config WHERE id=?',
            [req.params.id],
            (error) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ status: 'error', message: error });
                } else {
                    res.status(200).json({ status: 'success', message: 'Config deleted successfully' });
                }
            }
        );
    });

    return router;
}

module.exports = createRouter;