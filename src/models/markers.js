const express = require('express');

function createRouter(db) {
    const router = express.Router();

    // the routes are defined here

    router.post('/marker', (req, res, next) => {
        let created_at = new Date();
        db.query(
            'INSERT INTO marker (species_id, breed_id, user_id, title, description, type, color, coordinates, image, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
            [
                req.body.species_id,
                req.body.breed_id,
                req.body.user_id,
                req.body.title,
                req.body.description,
                req.body.type,
                req.body.color,
                req.body.coordinates,
                req.body.image,
                created_at,
                created_at
            ],
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ success: false, message: error });
                } else {
                    res.status(200).json({ success: true, message: 'Marker added successfully', result });
                }
            }
        );
    });

    router.get('/marker', function (req, res, next) {
        db.query(
            'SELECT * FROM marker', [],
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

    router.get('/marker/:id', function (req, res, next) {
        db.query(
            'SELECT * FROM marker WHERE id=?',
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

    router.put('/marker/:id', function (req, res, next) {
        let updated_at = new Date();
        db.query(
            'UPDATE marker SET species_id=?, breed_id=?, title=?, description=?, type=?, color=?, coordinates=?, image=?, updated_at=? WHERE id=?',
            [
                req.body.species_id,
                req.body.breed_id,
                req.body.title,
                req.body.description,
                req.body.type,
                req.body.color,
                req.body.coordinates,
                req.body.image,
                updated_at,
                req.params.id
            ],
            (error) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ status: 'error', message: error });
                } else {
                    res.status(200).json({ status: 'success', message: 'Marker updated successfully' });
                }
            }
        );
    });

    router.delete('/marker/:id', function (req, res, next) {
        db.query(
            'DELETE FROM marker WHERE id=?',
            [req.params.id],
            (error) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ status: 'error', message: error });
                } else {
                    res.status(200).json({ status: 'success', message: 'Marker deleted successfully' });
                }
            }
        );
    });

    return router;
}

module.exports = createRouter;