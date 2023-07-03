const express = require('express');

function createRouter(db) {
    const router = express.Router();

    // the routes are defined here

    router.post('/breed', (req, res, next) => {
        let created_at = new Date();
        db.query(
            'INSERT INTO breed (name, species_id, created_at, updated_at) VALUES (?,?,?,?)',
            [
                req.body.name,
                req.body.species_id,
                created_at,
                created_at
            ],
            (error) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ status: 'error', message: error });
                } else {
                    res.status(200).json({ status: 'success', message: 'Breed added successfully' });
                }
            }
        );
    });

    router.get('/breed', function (req, res, next) {
        db.query(
            'SELECT * FROM breed', [],
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

    router.get('/breed/:id', function (req, res, next) {
        db.query(
            'SELECT * FROM breed WHERE id=?',
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

    router.get('/breed/species/:id', function (req, res, next) {
        db.query(
            'SELECT * FROM breed WHERE species_id=?',
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

    router.put('/breed/:id', function (req, res, next) {
        let updated_at = new Date();
        db.query(
            'UPDATE breed SET name=?, species_id=?, updated_at=? WHERE id=?',
            [
                req.body.name,
                req.body.species_id,
                updated_at,
                req.params.id
            ],
            (error) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ status: 'error', message: error });
                } else {
                    res.status(200).json({ status: 'success', message: 'Breed updated successfully' });
                }
            }
        );
    });

    router.delete('/breed/:id', function (req, res, next) {
        db.query(
            'DELETE FROM breed WHERE id=?',
            [req.params.id],
            (error) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ status: 'error', message: error });
                } else {
                    res.status(200).json({ status: 'success', message: 'Breed deleted successfully' });
                }
            }
        );
    });

    return router;
}

module.exports = createRouter;