const router = require('express').Router();


const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const deviceController = require('./controllers/deviceController');

router.use(homeController);
router.use('/auth',authController);
router.use('/devices', deviceController);





router.all('*', (req, res) => {
    res.render('404');
})

module.exports = router;