import tippy from 'tippy.js';

let tooltip = (() => {
	const tooltips = document.querySelectorAll('[data-tippy-content]');

	let init = () => {
		if (tooltips.length === 0) return;

		tooltips.forEach((tooltip) => {
			tippy(tooltip, {
				trigger: 'mouseenter focus',
				theme: 'light',
				duration: 250,
				arrow: true,
				delay: [200, 500],
				interactive: true,
				allowHTML: true,
				//appendTo: tooltip,
			});
		});

		_setupListeners();
	};

	let _setupListeners = () => {};

	init();
})();
