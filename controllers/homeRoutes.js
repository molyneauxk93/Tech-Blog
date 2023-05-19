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
                    attributes: ['comment', 'date_created'],
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
        console.log(blogPosts);

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
    try { //find all blog posts user created by their id 
        const userData = await Blog.findAll({
            where: {
                user_id: req.session.user_id,
            },
        });
        //redirect if user is not logged in 
        if (!userData) {
            res.redirect('/login');
            return;
        }

        console.log(userData)
        //serialize 
        const userResults = userData.map((dash) => dash.get({ plain: true }));
        // console.log(userData)

        res.render('dashboard', {
            userResults,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

//open individual blog post by id 
router.get('/blog/:id', withAuth, async (req, res) => {
    try { //find blog post by its blog id to load a page with just the blog post including comments and other user data
        const postData = await Blog.findByPk(req.params.id, {
            include: [
                {
                    model: Comment,
                    attributes: ['comment', 'date_created'],
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

        const selectPost = postData.get({ plain: true });
        console.log(selectPost);

        res.render('blogpost', {
            selectPost,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// route to render edit post handlebar for editing of personal blog posts
router.get('/dashboard/:id', withAuth, async (req,res)=> {
    //find individual blog post selected on user dashboard and renders its details to be updated 
    try {
        const postData = await Blog.findByPk(req.params.id, {
            include: [
                {
                    model: Comment,
                    attributes: ['comment', 'date_created'],
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

        const selectPost = postData.get({ plain: true });
        console.log(selectPost);

        res.render('editpost', {
            selectPost,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


//load blog page for new blog post 
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