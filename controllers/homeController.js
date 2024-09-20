const router = require('express').Router();
const deviceService = require('../services/deviceService');
const userService = require('../services/userService')
const {isAuth} = require("../middlewares/authMiddleWare");

router.get('/',async (req, res) => {
    const recent = await deviceService.getLastThree().lean();

    res.render('home', {recent});
});

router.get('/about', (req, res) => {
    res.render('about');
});


router.get('/profile',isAuth, async (req, res) => {
const user =await userService.getInfo(req.user._id).lean();
const created = user.createdDevice;
const preferred = user.preferDevice;

    res.render('profile', {...user, created, preferred});
})


module.exports = router;