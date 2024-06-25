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
                        res.status(200).json({ success: true, message: 'User added successfully', result, created_at, hash });
                    }
                }
            );
        });
    });

    router.post('/user_following', (req, res, next) => {
        let created_at = new Date();
        db.query(
            'INSERT INTO user_following (follower_user_id, following_user_id, created_at, updated_at) VALUES (?,?,?,?)',
            [
                req.body.follower_user_id,
                req.body.following_user_id,
                created_at,
                created_at
            ],
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ success: false, message: error });
                } else {
                    res.status(200).json({ success: true, message: 'User followed successfully', result });
                }
            }
        );
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

    router.get('/user/username/:username', function (req, res, next) {
        db.query(
            'SELECT * FROM user WHERE username=?',
            [req.params.username],
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

    router.get('/user/match/:id', function (req, res, next) {
        db.query(
            'SELECT * FROM user WHERE id NOT IN (SELECT l.user2_id FROM `like` l WHERE l.user1_id = ?) AND id NOT IN (SELECT m.user2_id FROM `match` m WHERE m.user1_id = ?) AND id NOT IN (SELECT m.user1_id FROM `match` m WHERE m.user2_id = ?) AND id <> ? AND role_id = 2',
            [
                req.params.id,
                req.params.id,
                req.params.id,
                req.params.id,
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

    router.get('/user_following/isFollowing/:follower_id/:following_id', function (req, res, next) {
        db.query(
            'SELECT * FROM user_following WHERE follower_user_id=? AND following_user_id=?',
            [
                req.params.follower_id,
                req.params.following_id,
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

    router.get('/user_following/followers/:id', function (req, res, next) {
        db.query(
            'SELECT * FROM user_following WHERE following_user_id=?',
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

    router.get('/user_following/following/:id', function (req, res, next) {
        db.query(
            'SELECT * FROM user_following WHERE follower_user_id=?',
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

    router.get('/user_following/followedBy/:id/:current_user_id', function (req, res, next) {
        db.query(
            'SELECT u.username FROM user u INNER JOIN user_following uf ON uf.follower_user_id=u.id WHERE uf.following_user_id=? AND uf.follower_user_id!=? AND uf.follower_user_id IN (SELECT uf2.following_user_id FROM user_following uf2 WHERE uf2.follower_user_id=?) ORDER BY uf.id DESC',
            [
                req.params.id,
                req.params.current_user_id,
                req.params.current_user_id,
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

    router.get('/user_following/followingFull/:id', function (req, res, next) {
        db.query(
            'SELECT u.* FROM user u INNER JOIN user_following uf ON uf.following_user_id=u.id WHERE uf.follower_user_id=? ORDER BY uf.id DESC',
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

    router.get('/user_following/followersFull/:id', function (req, res, next) {
        db.query(
            'SELECT u.* FROM user u INNER JOIN user_following uf ON uf.follower_user_id=u.id WHERE uf.following_user_id=? ORDER BY uf.id DESC',
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

    router.delete('/user_following', function (req, res, next) {
        db.query(
            'DELETE FROM user_following WHERE follower_user_id=? AND following_user_id=?',
            [
                req.body.follower_user_id,
                req.body.following_user_id,
            ],
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ success: false, message: error });
                } else {
                    res.status(200).json({ success: true, message: 'User unfollowed successfully', result });
                }
            }
        );
    });

    return router;
}

module.exports = createRouter;