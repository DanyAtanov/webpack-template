import Cookies from 'js-cookie';

let toggleView = (() => {
	const $toggle = document.querySelector('.toggle-view');
	const $section = document.querySelector('.catalog-section');
	const $listItems = document.querySelectorAll(
		'.catalog-section__catalog-item'
	);

	let init = () => {
		if (!$toggle) return;

		if (Cookies.get('catalogView')) {
			if (Cookies.get('catalogView') === 'tile') {
				$section?.classList.add('--tile-view');
				$toggle.querySelector('input').checked = true;

				$listItems.forEach((item) => {
					item?.querySelector('.product-card').classList.remove('--wide');
				});
			}
		}

		_setupListeners();
	};

	let onClick = () => {
		$section?.classList.toggle('--tile-view');

		if ($section?.classList.contains('--tile-view')) {
			Cookies.set('catalogView', 'tile');
			$listItems.forEach((item) => {
				item?.querySelector('.product-card').classList.remove('--wide');
			});
		} else {
			Cookies.set('catalogView', 'list');
			$listItems.forEach((item) => {
				item?.querySelector('.product-card').classList.add('--wide');
			});
		}

		initAnimation();
	};

	let initAnimation = () => {
		$listItems.forEach((item) => {
			item.classList.add('--animation-list');

			item.addEventListener(
				'animationend',
				() => {
					item.classList.remove('--animation-list');
				},
				{ once: true }
			);
		});
	};

	let _setupListeners = () => {
		$toggle.querySelector('input').addEventListener('click', onClick);
	};

	init();
})();
