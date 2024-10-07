/**
 * Следование элемента за курсором в заданной области
 * @param {string} selector - Селектор области/секции
 * @param {string} followerSelector - Селектор элемента, следующий за крусором
 * @param {number} ratio - Коэффициент
 */

export function followCursor(selector, followerSelector, ratioX, ratioY) {
	const sections = document.querySelectorAll(selector);
	let matchMedia = window.matchMedia('(min-width: 1281px)');

	let init = () => {
		if (!matchMedia.matches || !sections.length) return;

		sections.forEach((sec) => {
			const follower = sec.querySelector(followerSelector);

			const ratioNumberX = ratioX ? ratioX : 1;
			const ratioNumberY = ratioY ? ratioY : 1;

			let cursorMove = (event, el) => {
				el = follower;
				follower.classList.add('--is-active');
				const followerPosition = `translate3d(calc(${event.offsetX * ratioNumberX}px), calc(${event.offsetY * ratioNumberY}px), 0)`;

				follower.style.transform = followerPosition;
			};

			if (follower) {
				sec.addEventListener('mousemove', cursorMove);

				sec.addEventListener('mouseout', () => {
					follower.classList.remove('--is-active');
				});
			}
		});

		_setupListeners();
	};

	let _setupListeners = () => {};

	init();
}
