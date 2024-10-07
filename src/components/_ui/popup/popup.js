import tippy from 'tippy.js';
import { phoneMask } from '../../../assets/javascript/utils/phoneMask';

let popup = (() => {
	const popups = document.querySelectorAll('[data-popup]');

	let init = () => {
		if (popups.length === 0) return;

		popups.forEach((popup) => {
			const templateName = popup.dataset.popup;
			const template = document.querySelector(
				`[data-popup-content='${templateName}']`
			);

			tippy(popup, {
				content: template.innerHTML,
				allowHTML: true,
				trigger: 'click',
				interactive: true,
				theme: 'light',
				duration: 250,
				arrow: true,
				placement: 'top',
				delay: [200, 200],
				onMount(instance) {
					const closeBtn = instance.popper.querySelector('.popup__close');

					closeBtn?.addEventListener('click', () => {
						instance.hide();
					});

					document.addEventListener(
						'keydown',
						(event) => {
							if (event.key === 'Escape' || event.keyCode === 27) {
								instance.hide();
							}
						},
						{ once: true }
					);

					phoneMask();
				},
			});
		});
	};

	init();
})();
