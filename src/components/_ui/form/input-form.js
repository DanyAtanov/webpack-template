import { phoneMask } from '../../../assets/javascript/utils/phoneMask';

let inputForm = (() => {
	const inputs = document.querySelectorAll('[data-mask]');

	let init = () => {
		if (inputs.length === 0) return;

		inputs.forEach((input) => {
			phoneMask();
		});
	};

	init();
})();
