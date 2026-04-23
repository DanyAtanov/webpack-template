// import Xwiper from 'xwiper';

let modal = (() => {
	let theModal;

	let init = () => {
		document.addEventListener('click', (event) => {
			const modalLink = event.target.closest('[data-modal]:not(dialog)'); // ищем ссылку или ее родителя

			if (modalLink) {
				event.preventDefault();

				theModal = document.querySelector(
					`dialog[data-modal="${modalLink.dataset.modal}"`
				);

				theModal?.showModal();

				// закрываем свайпом вниз
				/* if (window.matchMedia('(max-width: 767px)').matches && theModal) {
					const xwiper = new Xwiper(theModal);
					xwiper?.onSwipeDown(() => {
						theModal?.close();
					}),
						{ once: true };
				} */
			}
		});
	};

	init();
})();
