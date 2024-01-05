const express = require('express');

function createRouter(db, bcrypt) {
    const router = express.Router();

    // the routes are defined here

    router.post('/user', (req, res, next) => {
        let created_at = new Date();

        bcrypt.hash(req.body.password, 12, function (err, hash) {
            if (err) {
                console.error(error);
                res.status(500).json({ success: false, message: err });
                return;
            }
            db.query(
                'INSERT INTO user (username, email, password, name, role_id, birthday, gender, bio, image, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
                [
                    req.body.username,
                    req.body.email,
                    hash,
                    req.body.name,
                    req.body.role_id,
                    req.body.birthday,
                    req.body.gender,
                    req.body.bio,
                    req.body.image,
                    created_at,
                    created_at
                ],
                (error, result) => {
                    if (error) {
                        console.error(error);
                        res.status(500).json({ success: false, message: error });
                    } else {
                        res.status(200).json({ success: true, message: 'User added successfully', result });
                    }
                }
            );
        });
    });

    router.get('/user', function (req, res, next) {
        db.query(
            'SELECT * FROM user', [],
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

    router.get('/user/:id', function (req, res, next) {
        db.query(
            'SELECT * FROM user WHERE id=?',
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

    router.get('/user/excluding/:id', function (req, res, next) {
        db.query(
            'SELECT * FROM user WHERE id!=?',
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

    router.post('/user/login', function (req, res, next) {
        db.query(
            'SELECT * FROM user WHERE email=? LIMIT 1',
            [req.body.email],
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ success: false, message: error });
                } else {
                    if (result.length > 0) {
                        const user = result[0];
                        bcrypt.compare(req.body.password, user.password, function (err, result) {
                            if (result) {
                                res.status(200).json({ success: true, login: true, user });
                            } else {
                                res.status(200).json({ success: true, login: false });
                            }
                        });
                    } else {
                        res.status(404).json({ success: false, message: 'User not found', result });
                    }
                }
            }
        );
    });

    router.put('/user/:id', function (req, res, next) {
        let updated_at = new Date();
        db.query(
            'UPDATE user SET username=?, email=?, password=?, name=?, role_id=?, birthday=?, gender=?, bio=?, image=?, updated_at=? WHERE id=?',
            [
                req.body.username,
                req.body.email,
                req.body.password,
                req.body.name,
                req.body.role_id,
                req.body.birthday,
                req.body.gender,
                req.body.bio,
                req.body.image,
                updated_at,
                req.params.id
            ],
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ success: false, message: error });
                } else {
                    res.status(200).json({ success: true, message: 'User updated successfully', result });
                }
            }
        );
    });

    router.delete('/user/:id', function (req, res, next) {
        db.query(
            'DELETE FROM user WHERE id=?',
            [req.params.id],
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ success: false, message: error });
                } else {
                    res.status(200).json({ success: true, message: 'User deleted successfully', result });
                }
            }
        );
    });

    return router;
}

module.exports = createRouter;