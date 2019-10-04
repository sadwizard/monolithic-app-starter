export const getLinkToMailFromStr = (email) => {
	if (/@gmail\.com/.test(email)) {
		return 'https://mail.google.com';
	} else if (/@yandex.ru/.test(email)) {
		return 'https://mail.yandex.ru';
	} else if (/@(mail|inbox|list|bk)\.ru/.test(email)) {
		return 'https://account.mail.ru/';
	} else {
		return null;
	}
}