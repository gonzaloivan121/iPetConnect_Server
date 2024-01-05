const express = require('express');

function createRouter(db) {
    const router = express.Router();

    // the routes are defined here

    router.post('/role', (req, res, next) => {
        let created_at = new Date();
        db.query(
            'INSERT INTO role (name, created_at, updated_at) VALUES (?,?,?)',
            [
                req.body.name,
                created_at,
                created_at
            ],
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ success: false, message: error });
                } else {
                    res.status(200).json({ success: true, message: 'Role added successfully', result });
                }
            }
        );
    });

    router.get('/role', function (req, res, next) {
        db.query(
            'SELECT * FROM role', [],
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

    router.get('/role/:id', function (req, res, next) {
        db.query(
            'SELECT * FROM role WHERE id=?',
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

    router.put('/role/:id', function (req, res, next) {
        let updated_at = new Date();
        db.query(
            'UPDATE role SET name=?, updated_at=? WHERE id=?',
            [
                req.body.name,
                updated_at,
                req.params.id
            ],
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ success: false, message: error });
                } else {
                    res.status(200).json({ success: true, message: 'Role updated successfully', result });
                }
            }
        );
    });

    router.delete('/role/:id', function (req, res, next) {
        db.query(
            'DELETE FROM role WHERE id=?',
            [req.params.id],
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ success: false, message: error });
                } else {
                    res.status(200).json({ success: true, message: 'Role deleted successfully', result });
                }
            }
        );
    });

    return router;
}

module.exports = createRouter;