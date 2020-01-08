// user.js - user route module.

const express = require('express');
const router = express.Router();
const { validate, check, response404 } = require('/middlewares/express-validator');
const injectAction = require('/middlewares/inject-action');

router.post('/', injectAction('user/getuser'));

module.exports = router;