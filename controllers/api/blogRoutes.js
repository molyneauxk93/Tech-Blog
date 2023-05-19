const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth');

//route used to save new blog posts 
router.post('/', withAuth, async (req, res) => {
    try {
        const newBlog = await Blog.create({
            ...req.body,
            userId: req.session.user_id,
        });

        res.status(200).json(newBlog);
    } catch (err) {
        res.status(400).json(err);
    }
});

//update blog post route 
router.put('/:id', withAuth, async (req, res) => {
    try { // runs update on blog post where the id matches the blog id of the post 
        const blogData = await Blog.update(req.body, {
            where: {
                id: req.params.id,
            }
        })

        res.status(200).json(blogData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try { // route finds and deletes specific blog post based on the id and the logged in user id 
        const blogData = await Blog.destroy({
            where: {
                id: req.params.id,
                userId: req.session.user_id,
            },
        });

        if (!blogData) {
            res.status(404).json({ message: 'No blog post found with this id!' });
            return;
        }

        res.status(200).json(blogData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;