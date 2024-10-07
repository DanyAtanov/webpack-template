import IMask from 'imask';

export function phoneMask() {
	const inputs = document.querySelectorAll('[data-mask]');

	let init = () => {
		if (inputs.length === 0) return;

		let maskOptions = {
			mask: '+{7} (000) 000-00-00',
			startsWith: '+7',
			// placeholderChar: '#',
			// lazy: false,
			// country: 'Russia',
		};

		inputs.forEach((input) => {
			let mask = IMask(input, maskOptions);

			input?.addEventListener('blur', () => {
				if (input.value.length < 18) {
					input.value = '';

					mask.updateValue();
				} else return;
			});
		});
	};

	init();
}
