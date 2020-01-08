module.exports = function(ctrlPath) {
    const controller = require(`../controllers/${ctrlPath}`);
    return (req, res) => {
        const action = new controller(req, res);
        action.run();
    };
}