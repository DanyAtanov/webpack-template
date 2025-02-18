import Cookies from 'js-cookie';
let cookiesHandler = (() => {
	const cookieName = 'somename_userIsBack';

	let init = () => {
		if (Cookies.get(cookieName)) return;

		const $buttonShow = document.querySelector('#cookies-trigger');
		const $buttonHide = document.querySelector('.cookie-alert__button-close');

		$buttonShow.click();

		$buttonHide.addEventListener(
			'click',
			() => {
				Cookies.set(cookieName, true, { expires: 30 });
			},
			{ once: true }
		);
	};

	init();
})();
