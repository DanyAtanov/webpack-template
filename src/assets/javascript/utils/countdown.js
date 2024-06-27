/**
 * Анимация счетчика для чисел
 * @param {string} selector - Селектор элемента
 * @param {number} duration - Время анимации в мс
 * @param {number} start - Начальное значение
 * @param {number} end - Конечное значение (если есть)
 */

export function countdown(selector, duration, start, end = null) {
	const elements = document.querySelectorAll(selector);

	elements.forEach((element) => {
		let startTimestamp = null;
		const finalEnd = end !== null ? end : element.innerHTML;

		const step = (timestamp) => {
			if (!startTimestamp) startTimestamp = timestamp;

			const progress = Math.min((timestamp - startTimestamp) / duration, 1);

			element.innerHTML = Math.floor(progress * (+finalEnd - start) + start);

			if (progress < 1) {
				window.requestAnimationFrame(step);
			}
		};

		window.requestAnimationFrame(step);
	});
}
