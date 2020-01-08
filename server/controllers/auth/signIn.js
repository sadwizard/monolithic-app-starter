const BaseAction = require('/controllers/BaseAction');


class SignInAction extends BaseAction {
	async run() {
		try {

			const { email, password } = this.req.body;

			const checkUserQuery = await this.query(`SELECT * FROM users WHERE email='${email}'`);

			if (checkUserQuery.length === 0) {
			  return this.fail('Неправельный логин или пароль.');
			}

			const {
				first_name, type, phone, slug, short_description, address,
				avatar, specialize_one, specialize_two, showcase_layout,
				social_links, id } = checkUserQuery[0];

			const authUserQuery = await this.query(`SELECT * FROM auth WHERE user_id='${id}'`);

			const { blocked, password: realPassword, activate_account } = authUserQuery[0];


			if (realPassword !== BaseAction.md5(password)) {
			  return this.fail('Неправельный логин или пароль.');
			}

			const token = BaseAction.randomString(30);
			const saveTokenQuery = await this.query(`UPDATE auth SET token='${token} WHERE user_id=${id}'`);

			this.ok({
			  token,
			  user: {
			    name: first_name,
			    phone,
			    email,
			    slug,
			    type,
			    short_description, address, avatar,
			    specialize_one, specialize_two,
			    showcase_layout, social_links,
			    activate_account,
			  }
			});


		} catch(e) {
			console.error(e);
			this.error(e.message);
		}
	}
}

module.exports = SignInAction;
