// динамический импорт. ВАРИАНТ 1
/* if (document.querySelectorAll('.countdown').length) {
	await import('../../assets/javascript/utils/countdown')
		.then((module) => {
			module.Countdown;

			const counter = new module.Countdown('.countdown', 1000, 3000);
			counter.init();
		})
		.catch((err) => {
			console.log('Ошибка загрузки модуля:', err);
		});
} */

// Динамический импорт. ВАРИАНТ 2
if (document.querySelectorAll('.countdown').length) {
	let { countdown } = await import('../../assets/javascript/utils/countdown');
	let { isInViewport } = await import(
		'../../assets/javascript/utils/isInViewport'
	);

	isInViewport('.countdown', () => {
		countdown('.countdown', 2000, 1000);
	});
}
