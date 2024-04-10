const express = require('express');

function createRouter(db, bcrypt) {
    const router = express.Router();

    // the routes are defined here

    router.post('/blog_post', (req, res, next) => {
        let created_at = new Date();

        db.query(
            'INSERT INTO blog_post (title, description, content, image, category_id, user_id, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?)',
            [
                req.body.title,
                req.body.description,
                req.body.content,
                req.body.image,
                req.body.category_id,
                req.body.user_id,
                created_at,
                created_at
            ],
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ success: false, message: error });
                } else {
                    res.status(200).json({ success: true, message: 'Blog Post added successfully', result, created_at });
                }
            }
        );
    });

    router.post('/blog_post_tag', (req, res, next) => {
        const post_id = req.body.post_id;
        const tag_ids = req.body.tag_ids;
        var str = "";

        for (let index = 0; index < tag_ids.length; index++) {
            const tag_id = tag_ids[index];

            str += "(" + post_id + "," + tag_id + ")";
            
            if (index < tag_ids.length - 1) {
                str += ",";
            }
        }

        db.query(
            'INSERT INTO blog_post_tag (post_id, tag_id) VALUES ' + str,
            [],
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ success: false, message: error });
                } else {
                    res.status(200).json({ success: true, message: 'Tags added successfully to the Post', result });
                }
            }
        );
    });

    router.get('/blog_post', function (req, res, next) {
        db.query(
            'SELECT * FROM blog_post', [],
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

    router.get('/blog_post/latest', function (req, res, next) {
        db.query(
            'SELECT * FROM blog_post WHERE published=1 ORDER BY id DESC', [],
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

    router.get('/blog_post/popularity', function (req, res, next) {
        db.query(
            'SELECT * FROM blog_post ORDER BY popularity DESC', [],
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

    router.get('/blog_post/:id', function (req, res, next) {
        db.query(
            'SELECT * FROM blog_post WHERE id=?',
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

    router.get('/blog_post/tags/:tags', function (req, res, next) {
        const tags = req.params.tags;
        const tagsStr = "'" + tags.split(",").join("','") + "'";

        db.query(
            'SELECT bp.* FROM blog_post bp INNER JOIN blog_post_tag bpt ON bp.id = bpt.post_id INNER JOIN blog_tag bt ON bpt.tag_id = bt.id WHERE bt.name IN (' + tagsStr + ') GROUP BY bp.id',
            [],
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

    router.get('/blog_post/blog_tag/:id', function (req, res, next) {
        db.query(
            'SELECT bp.* FROM blog_post bp INNER JOIN blog_post_tag bpt ON bp.id = bpt.post_id INNER JOIN blog_tag bt ON bpt.tag_id = bt.id WHERE bt.id=?',
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

    router.get('/blog_post/tags/id/:tag_ids', function (req, res, next) {
        const tagIds = req.params.tag_ids;
        const tagIdsString = "'" + tagIds.split(",").join("','") + "'";

        db.query(
            'SELECT bp.* FROM blog_post bp INNER JOIN blog_post_tag bpt ON bp.id = bpt.post_id INNER JOIN blog_tag bt ON bpt.tag_id = bt.id WHERE bt.id IN (' + tagIdsString + ') GROUP BY bp.id',
            [],
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

    router.get('/blog_post/blog_category/:id', function (req, res, next) {
        db.query(
            'SELECT * FROM blog_post WHERE category_id=?',
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

    router.get('/blog_post/blog_category/:id/excluding/:excludeId', function (req, res, next) {
        db.query(
            'SELECT * FROM blog_post WHERE category_id=? AND id!=?',
            [
                req.params.id,
                req.params.excludeId
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

    router.get('/blog_post/blog_category/:id/popularity', function (req, res, next) {
        db.query(
            'SELECT * FROM blog_post WHERE category_id=? ORDER BY popularity DESC',
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

    router.put('/blog_post/:id', function (req, res, next) {
        let updated_at = new Date();

        db.query(
            'UPDATE blog_post SET title=?, description=?, content=?, image=?, popularity=?, category_id=?, user_id=?, updated_at=? WHERE id=?',
            [
                req.body.title,
                req.body.description,
                req.body.content,
                req.body.image,
                req.body.popularity,
                req.body.category_id,
                req.body.user_id,
                updated_at,
                req.params.id
            ],
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ success: false, message: error });
                } else {
                    res.status(200).json({ success: true, message: 'Blog Post updated successfully', result });
                }
            }
        );
    });

    router.delete('/blog_post/:id', function (req, res, next) {
        db.query(
            'DELETE FROM blog_post WHERE id=?',
            [req.params.id],
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ success: false, message: error });
                } else {
                    res.status(200).json({ success: true, message: 'Blog Post deleted successfully', result });
                }
            }
        );
    });

    return router;
}

module.exports = createRouter;