let header = (() => {
	const $header = document.querySelectorAll('header.header');

	let init = () => {
		if (!$header) return;

		console.log('header init')

		_setupListeners();
	};

	let _setupListeners = () => {};

	init();
})();
