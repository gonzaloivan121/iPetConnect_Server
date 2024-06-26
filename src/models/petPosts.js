const express = require('express');

function createRouter(db) {
    const router = express.Router();

    // the routes are defined here

    router.post('/pet_post', (req, res, next) => {
        let created_at = new Date();

        db.query(
            'INSERT INTO pet_post (title, description, image, enable_comments, pet_id, user_id, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?)',
            [
                req.body.title,
                req.body.description,
                req.body.image,
                req.body.enable_comments,
                req.body.pet_id,
                req.body.user_id,
                created_at,
                created_at
            ],
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ success: false, message: error });
                } else {
                    res.status(200).json({ success: true, message: 'Pet Post added successfully', result, created_at });
                }
            }
        );
    });

    router.get('/pet_post', function (req, res, next) {
        db.query(
            'SELECT * FROM pet_post', [],
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

    router.get('/pet_post/latest', function (req, res, next) {
        db.query(
            'SELECT * FROM pet_post ORDER BY id DESC', [],
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

    router.get('/pet_post/:id', function (req, res, next) {
        db.query(
            'SELECT * FROM pet_post WHERE id=?',
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

    router.get('/pet_post/pet/:id', function (req, res, next) {
        db.query(
            'SELECT * FROM pet_post WHERE pet_id=?',
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

    router.get('/pet_post/user/:id', function (req, res, next) {
        db.query(
            'SELECT * FROM pet_post WHERE user_id=?',
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

    router.get('/pet_post/user_following/:id', function (req, res, next) {
        db.query(
            'SELECT pp.* FROM pet_post pp INNER JOIN user_following uf ON pp.user_id=uf.following_user_id WHERE uf.follower_user_id=? ORDER BY pp.id DESC',
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

    router.put('/pet_post/:id', function (req, res, next) {
        let updated_at = new Date();

        db.query(
            'UPDATE pet_post SET title=?, description=?, image=?, enable_comments=?, pet_id=?, user_id=?, updated_at=? WHERE id=?',
            [
                req.body.title,
                req.body.description,
                req.body.image,
                req.body.enable_comments,
                req.body.pet_id,
                req.body.user_id,
                updated_at,
                req.params.id
            ],
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ success: false, message: error });
                } else {
                    res.status(200).json({ success: true, message: 'Pet Post updated successfully', result });
                }
            }
        );
    });

    router.delete('/pet_post/:id', function (req, res, next) {
        db.query(
            'DELETE FROM pet_post WHERE id=?',
            [req.params.id],
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ success: false, message: error });
                } else {
                    res.status(200).json({ success: true, message: 'Pet Post deleted successfully', result });
                }
            }
        );
    });

    return router;
}

module.exports = createRouter;