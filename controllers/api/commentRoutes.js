const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//route to add comment to specific blog post based on the id 
router.post('/:id', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            blogId: req.params.id,
            userId: req.session.user_id,
        });

        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

// comment delete route not used due to acceptance criteria 
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!commentData) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
        }

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;