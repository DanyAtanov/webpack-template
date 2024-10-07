// import 'core-js/stable';
import Alpine from 'alpinejs';
import { Throttle } from '../utils/throttle';

window.Alpine = Alpine;
Alpine.start();
document.body.classList.add('page_loaded');

const allSkeletons = document.querySelectorAll('.skeleton');
let disableHoverTimer;
let windowScroll = 0;
let windowLastScroll = 0;
let updateScrollState = () => {
	windowScroll = window.scrollY;

	if (windowScroll > 30) {
		document.body.classList.add('page_scrolled');

		if (windowScroll > windowLastScroll) {
			document.body.classList.add('page_scrolled-down');
			document.body.classList.remove('page_scrolled-up');
		} else if (windowScroll < windowLastScroll) {
			document.body.classList.add('page_scrolled-up');
			document.body.classList.remove('page_scrolled-down');
		}
	} else {
		document.body.classList.remove('page_scrolled');
	}

	setTimeout(() => {
		windowLastScroll = windowScroll;
	}, 0);
};

let winScroll = new Throttle(updateScrollState, 150);

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
	winScroll.throttle();

	clearTimeout(disableHoverTimer);
	if (!document.body.classList.contains('disable-hover')) {
		document.body.classList.add('disable-hover');
	}

	disableHoverTimer = setTimeout(function () {
		document.body.classList.remove('disable-hover');
	}, 350);
});
