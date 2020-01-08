// auth.js - auth route module.

const express = require('express');
const router = express.Router();
const { validate, check, response404 } = require('../../middlewares/express-validator');
const injectAction = require('/middlewares/inject-action');

router.post('/signup', validate([
    check('email').isEmail(),
    check('password').isString(),
    check('type').isString(),
], response404), injectAction('auth/signUp'));


router.post('/signin', validate([
    check('email').isEmail(),
    check('password').isString(),
], response404), injectAction('auth/signIn'));

module.exports = router;