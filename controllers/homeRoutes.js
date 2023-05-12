const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

//route to tech blog home page where all comments on the tech blog can be seen by all users, whether logged in or not 
router.get('/', async (req, res) => {
    try {
        //Get all blog posts 
        const blogData = await Blog.findAll({
            include: [
                {
                    model: Comment,
                    attributes: ['comment'],
                    include: {
                        model: User,
                        attributes: ['username'],
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                },
            ],
        });

        //serealizing data to be read by template
        const blogPosts = blogData.map((blog) => blog.get({ plain: true }));
        console.log(blogPosts[0].comments);

        res.render('homepage', {
            blogPosts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//render user blog posts to the dashboard when the user is logged in
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userData = await Blog.findByPk(req.session.user_id, {
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
            ],
        });

        if(!userData) {
            res.redirect('/login');
            return;
        }

        
        //serialize 
        const userResults = userData.get({ plain: true });
        console.log(userResults)

        res.render('dashboard', { 
            userResults, 
        });
    } catch (err) {
        res.status(400).json(err);
    }
});


//load blog page 
router.get('/blog', (req, res) => {
    //if the user is logged in redirect to their user dashboard
    if (!req.session.logged_in) {
        res.redirect('/homepage');
        return;
    }

    res.render('blog');
});

//if user navigates to log in when already logged in it will redirect 
router.get('/login', (req, res) => {
    //if the user is logged in redirect to their user dashboard
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }

    res.render('login');
});

//if user navigates to sign up when already logged in it will redirect 
router.get('/signup', (req, res) => {
    //if the user is logged in redirect to their user dashboard
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }

    res.render('signup');
});

module.exports = router;