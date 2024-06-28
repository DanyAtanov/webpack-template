const hoverFill = (() => {
	let hoverElements = document.querySelectorAll('.hover-fill');

	let init = () => {
		if (hoverElements.length === 0) return;

		const ripple = document.createElement('span');
		ripple.classList.add('--ripple');
		let cleartimeout;

		hoverElements.forEach((element) => {
			element.addEventListener('mouseover', function (event) {
				const boundingClientRect = event.target.getBoundingClientRect();
				let x = event.clientX - boundingClientRect.left;
				let y = event.clientY - boundingClientRect.top;
				ripple.style.left = x + 'px';
				ripple.style.top = y + 'px';
				this.appendChild(ripple);
			});

			element.addEventListener('mouseout', function () {
				ripple.remove(cleartimeout);
			});

			cleartimeout = setTimeout(() => {
				ripple.remove();
			}, 1000);
		});

		_setupListeners();
	};

	let _setupListeners = () => {};

	init();
})();
