const express = require('express');

function createRouter(db) {
    const router = express.Router();

    // the routes are defined here

    router.post('/pet', (req, res, next) => {
        let created_at = new Date();
        db.query(
            'INSERT INTO pet (name, species_id, breed_id, gender, color, image, user_id, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?,?)',
            [
                req.body.name,
                req.body.species_id,
                req.body.breed_id,
                req.body.gender,
                req.body.color,
                req.body.image,
                req.body.user_id,
                created_at,
                created_at
            ],
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ success: false, message: error });
                } else {
                    res.status(200).json({ success: true, message: 'Pet added successfully', result });
                }
            }
        );
    });

    router.get('/pet', function (req, res, next) {
        db.query(
            'SELECT * FROM pet', [],
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

    router.get('/pet/:id', function (req, res, next) {
        db.query(
            'SELECT * FROM pet WHERE id=?',
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

    router.get('/pet/user/:id', function (req, res, next) {
        db.query(
            'SELECT * FROM pet WHERE user_id=?',
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

    router.put('/pet/:id', function (req, res, next) {
        let updated_at = new Date();
        db.query(
            'UPDATE pet SET name=?, species_id=?, breed_id=?, gender=?, color=?, image=?, updated_at=? WHERE id=?',
            [
                req.body.name,
                req.body.species_id,
                req.body.breed_id,
                req.body.gender,
                req.body.color,
                req.body.image,
                updated_at,
                req.params.id
            ],
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ success: false, message: error });
                } else {
                    res.status(200).json({ success: true, message: 'Pet updated successfully', result });
                }
            }
        );
    });

    router.delete('/pet/:id', function (req, res, next) {
        db.query(
            'DELETE FROM pet WHERE id=?',
            [req.params.id],
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ success: false, message: error });
                } else {
                    res.status(200).json({ success: true, message: 'Pet deleted successfully', result });
                }
            }
        );
    });

    return router;
}

module.exports = createRouter;