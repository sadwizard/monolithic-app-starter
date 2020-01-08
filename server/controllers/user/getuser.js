// const checkauth = require('../auth/checkAuth');
const BaseAction = require('/controllers/BaseAction');

class GetUserAction extends BaseAction {
	async run() {
		try {


			const userId = await this.checkAuth();
			if (!userId) {
			  	return this.fail();
			}

			const user = await this.query(`SELECT * FROM users WHERE id='${userId}'`);

			const {
				first_name, email, type, phone, slug, short_description, address,
				avatar, specialize_one, specialize_two, showcase_layout,
				social_links, id } = user[0];

			this.ok({
			  	user: {
					name: first_name,
					phone,
					email,
					slug,
					type,
					short_description, address, avatar,
					specialize_one, specialize_two,
					showcase_layout, social_links,
			  	}
			});


		} catch(e) {
			console.error(e);
			this.error(e.message);
		}
	}
}

module.exports = GetUserAction;
