const BaseAction = require('/controllers/BaseAction');

class YourAction extends BaseAction {
    async run() {
        try {

            this.ok({ message: 'ok' });








        } catch(e) {
            console.error(e);
            this.error(e.message);
        }
    }
}

module.exports = YourAction;
