/**
 * Вызыов callback-функции когда элемент во вьюпорте
 * @param {string} selector - Селектор элемента
 * @param {function} callback - Callback-функция
 */

export function isInViewport(selector, callback) {
	if (!selector || typeof callback !== 'function') {
		throw new Error(
			'Неправильные аргументы: селектор и callback-функция необходимы.'
		);
	}

	const elements = document.querySelectorAll(selector);

	if (elements.length === 0) {
		throw new Error('Элементы по заданному селектору не найдены.');
	}

	let observer = new IntersectionObserver((entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				callback(entry.target);
				observer.unobserve(entry.target);
			}
		});
	});

	elements.forEach((element) => observer.observe(element));
}
