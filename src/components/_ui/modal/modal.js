let modal = (() => {
	const buttons = document.querySelectorAll('[data-modal]:not(dialog)');
	const modals = document.querySelectorAll('dialog[data-modal]');

	let init = () => {
		if (buttons.length === 0) return;

		let theModal;
		let closeButton;

		buttons.forEach((button) => {
			button.addEventListener('click', (event) => {
				event.preventDefault();
				for (let index = 0; index < modals.length; index++) {
					const el = modals[index];

					if (el.dataset.modal === button.dataset.modal) {
						theModal = el;
						closeButton = el.querySelector('.modal__close');

						break;
					}
				}

				theModal?.showModal();
			});
		});
	};

	init();
})();
