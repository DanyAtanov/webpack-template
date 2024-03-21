import 'core-js/stable';
import Alpine from 'alpinejs';

window.Alpine = Alpine;
Alpine.start();
document.body.classList.add('page_loaded');

let disableHoverTimer;
let windowScroll = 0;
let windowLastScroll = 0;

const allSkeletons = document.querySelectorAll('.skeleton');
const lazyImages = document.querySelectorAll('.lazy');

lazyImages.forEach((image) => {
	if (image.complete) {
		image.classList.add('--is-loaded');
	} else {
		image.addEventListener(
			'load',
			() => {
				image.classList.add('--is-loaded');
			},
			{ once: true }
		);
	}
});

let throttlePause;
const _throttle = (callback, time) => {
	if (throttlePause) return;
	throttlePause = true;
	setTimeout(() => {
		callback();
		throttlePause = false;
	}, time);
};

const updateScrollState = () => {
	windowScroll = window.scrollY;

	if (windowScroll > 30) {
		document.body.classList.add('page_scrolled');
	} else {
		document.body.classList.remove('page_scrolled');
	}

	if (windowScroll > 30) {
		if (windowScroll > windowLastScroll) {
			document.body.classList.add('page_scrolled-down');
			document.body.classList.remove('page_scrolled-up');
		} else if (windowScroll < windowLastScroll) {
			document.body.classList.add('page_scrolled-up');
			document.body.classList.remove('page_scrolled-down');
		}
	}

	setTimeout(() => {
		windowLastScroll = windowScroll;
	}, 0);
};

window.addEventListener(
	'load',
	() => {
		document.body.classList.add('page_loaded');
		document.body.classList.remove('preload');

		if (allSkeletons.length > 0) {
			allSkeletons.forEach((skeleton) => {
				skeleton.classList.remove('skeleton');
			});
		}
	},
	{ once: true }
);

window.addEventListener('scroll', () => {
	_throttle(updateScrollState, 150);

	clearTimeout(disableHoverTimer);
	if (!document.body.classList.contains('disable-hover')) {
		document.body.classList.add('disable-hover');
	}

	disableHoverTimer = setTimeout(function () {
		document.body.classList.remove('disable-hover');
	}, 350);
});
