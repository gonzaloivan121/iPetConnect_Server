const express = require('express');

function createRouter(db) {
    const router = express.Router();

    // the routes are defined here

    router.post('/species', (req, res, next) => {
        let created_at = new Date();
        db.query(
            'INSERT INTO species (name, created_at, updated_at) VALUES (?,?,?)',
            [
                req.body.name,
                created_at,
                created_at
            ],
            (error) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ status: 'error', message: error });
                } else {
                    res.status(200).json({ status: 'success', message: 'Species added successfully' });
                }
            }
        );
    });

    router.get('/species', function (req, res, next) {
        db.query(
            'SELECT * FROM species', [],
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

    router.get('/species/:id', function (req, res, next) {
        db.query(
            'SELECT * FROM species WHERE id=?',
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

    router.put('/species/:id', function (req, res, next) {
        let updated_at = new Date();
        db.query(
            'UPDATE species SET name=?, updated_at=? WHERE id=?',
            [
                req.body.name,
                updated_at,
                req.params.id
            ],
            (error) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ status: 'error', message: error });
                } else {
                    res.status(200).json({ status: 'success', message: 'Species updated successfully' });
                }
            }
        );
    });

    router.delete('/species/:id', function (req, res, next) {
        db.query(
            'DELETE FROM species WHERE id=?',
            [req.params.id],
            (error) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ status: 'error', message: error });
                } else {
                    res.status(200).json({ status: 'success', message: 'Species deleted successfully' });
                }
            }
        );
    });

    return router;
}

module.exports = createRouter;