const router = require('express').Router();
const {getErrorMessage} = require("../utils/errorUtils");
const {isAuth} = require("../middlewares/authMiddleWare");
const deviceService = require('../services/deviceService');
const userService = require('../services/userService');

router.get('/', async (req, res) => {
    const devices = await deviceService.getAll().lean();

    res.render('catalog', {devices})
});


router.get('/create', isAuth, (req, res) => {
    res.render('create')
});

router.post('/create', isAuth, async (req, res) => {
    const deviceData = req.body;

    try {
        await deviceService.create(req.user._id, deviceData);

        res.redirect('/devices')
    } catch (err) {
        res.render('create', {...deviceData, error: getErrorMessage(err)});
    }
});

router.get('/:deviceId/details', async (req, res) => {
    const device = await deviceService.getOneWithDetails(req.params.deviceId).lean();
    //  const user = await userService.getInfo(req.user._id);


    const allPref = device.preferredList.length;

    const isOwner = device.owner._id == req.user?._id;

    const isPref = device.preferredList.some(user => user._id == req.user?._id);


    res.render('details', {...device, isPref, isOwner, allPref});
});
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@

router.get('/:deviceId/prefer', async (req, res) => {

    await deviceService.prefer(req.params.deviceId, req.user._id);

    res.redirect(`/devices/${req.params.deviceId}/details`);
});


router.get('/:deviceId/delete', isDeviceOwner, async (req, res) => {
    await deviceService.delete(req.params.deviceId);

    res.redirect('/devices');
});

router.get('/:deviceId/edit', isDeviceOwner, async (req, res) => {
    res.render('edit', {...req.device});

});


router.post('/:deviceId/edit', isDeviceOwner, async (req, res) => {
    const deviceData = req.body;

    try {
        await deviceService.edit(req.params.deviceId, deviceData);
        res.redirect(`/devices/${req.params.deviceId}/details`)
    } catch (err) {
        res.render('edit', {...deviceData, error: getErrorMessage(err)});

    }

})


async function isDeviceOwner(req, res, next) {
    const device = await deviceService.getOne(req.params.deviceId).lean();

    if (device.owner != req.user?._id) {
        return res.redirect(`/devices/${req.params.deviceId}/details`);
    }

    req.device = device;
    next()
}

module.exports = router;