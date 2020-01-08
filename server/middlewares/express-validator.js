const { check, validationResult } = require('express-validator');

function validate(params, errorCallback) {
    return async (req, res, next) => {
        await Promise.all(params.map(validation => validation.run(req)));
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            if (typeof errorCallback === 'function') {
                errorCallback(errors.array(), res);
                return;
            }

            return response404(errors.array(), res);
        }

        next();
    };
}

function response404(err, res) {
    res.status(404).json({ type: 'error', message: err });
}


module.exports = { check, validate, response404 };