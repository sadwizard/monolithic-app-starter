const Database = require('/db/Database');
const cryptoRandomString = require('crypto-random-string');
const md5 = require('/utils/md5').MD5;

class BaseAction extends Database {
    constructor(req, res) {
        super();
        this.req = req;
        this.res = res;
    }

    query(sql) {
        return super.query(sql);
    }

    ok(json) {
        this.closeConnect();
        this.res.status(200).json(json);
    }

    fail(message) {
        this.closeConnect();
        this.res.status(404).json({ message: message || '' });
    }

    error(message) {
        this.closeConnect();
        this.res.status(500).json({ message });
    }

    async checkAuth() {
        const token = this.req.get('Api-bearer');

        if (token) {
            const user = await this.query(`SELECT user_id FROM auth WHERE token='${token}'`);

            if (!!user.length) {
                return user[0].user_id;
            } else {
                return null
            }
        }

        return null;
    }

    static md5(value) {
        return md5(value);
    }

    static randomString(value) {
        return cryptoRandomString(value);
    }
}

module.exports = BaseAction;