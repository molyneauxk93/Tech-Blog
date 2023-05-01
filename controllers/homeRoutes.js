const router = require('express').Router();
const { Blog, User } = require('../models');
const withAuth = require('../utils/auth');

//route to tech blog home page where all comments on the tech blog can be seen by all users, whether logged in or not 
router.get('/', async (req, res) => {
    try {
        //Get all blog posts 
        const blogData = await Blog.findAll();

        //serealizing data to be read by template
        const blogPosts = blogData.map((blog) => blog.get({ plain: true }));

        res.render('homepage', {
            blogPosts,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        // Find the logged in user based on the session ID
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Blog }],
        });

        const user = userData.get({ plain: true });

        res.render('dashboard', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    //if the user is logged in redirect to their user dashboard
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }

    res.render('login');
});

router.get('/signup', (req, res) => {
    //if the user is logged in redirect to their user dashboard
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }

    res.render('signup');
});

module.exports = router;