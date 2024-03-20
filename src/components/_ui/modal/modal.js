const modal = (() => {
	const buttons = document.querySelectorAll('[data-open-modal]');
	const modals = document.querySelectorAll('[data-modal]');

	const init = () => {
		if (buttons.length === 0) return;

		let theModal;
		let closeButton;

		buttons.forEach((button) => {
			button.addEventListener('click', () => {
				for (let index = 0; index < modals.length; index++) {
					const el = modals[index];

					if (el.dataset.modal === button.dataset.openModal) {
						theModal = el;
						closeButton = el.querySelector('.modal__close');

						break;
					}
				}

				theModal?.showModal();

				theModal.addEventListener('click', handleModalClick);
			});
		});
	};

	const handleModalClick = ({ currentTarget, target }) => {
		const isClickedOnBackdrop = target === currentTarget;

		if (isClickedOnBackdrop) {
			currentTarget.close();
		}
	};

	init();
})();
