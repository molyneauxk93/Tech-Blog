const router = require('express').Router();
const userRoutes = require('./userRoutes');
const userRoutes = require('./commentRoutes');
const userRoutes = require('./blogRoutes');


router.use('/users', userRoutes);
router.use('/blog', blogRoutes);
router.use('/comment', commentRoutes);

module.exports = router;
