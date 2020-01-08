const BaseAction = require('/controllers/BaseAction');


class SignUpAction extends BaseAction {
	async run() {
		try {

			let { email, password, type } = this.req.body;

			const slug = BaseAction.randomString(15);
			const checkUserQuery = await this.query(`SELECT email FROM users WHERE email='${email}'`);

			if (checkUserQuery.length) {
				return this.fail('Такой пользователь уже зарегистрирован.');
			}

			password = BaseAction.md5(password);
			const token = BaseAction.randomString(30);
			const activateCode = BaseAction.randomString(30);

			const insertUserQuery = await this.query(`INSERT INTO users(type, email, slug) VALUES ('${type}', '${email}', '${slug}')`);
			const queryAuth = await this.query(`INSERT INTO auth(user_id, token, password, ip, activate_account_code) VALUES ('${insertUserQuery.insertId}', '${token}', '${password}','${this.req.ip}', '${activateCode}')`);

			if (queryAuth && insertUserQuery) {
				// доработать отправку письма с подтверждением
				this.ok({
					token: token,
					user: {
					  email: email,
					  typeAccount: type
					}
				});
			} else {
				this.fail();
			}



		} catch(e) {
			console.error(e);
			this.error(e.message);
		}
	}
}

module.exports = SignUpAction;
