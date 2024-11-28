// import 'core-js/stable';
import Alpine from 'alpinejs';
import mask from '@alpinejs/mask';
import { Throttle } from '../utils/throttle';

window.Alpine = Alpine;

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

window.addEventListener('DOMContentLoaded', () => {
	Alpine.plugin(mask);
	
	Alpine.data('mask', () => ({
		init() {
			this.$el.addEventListener('blur', () => {
				if (
					this.$el.value.length < 18 &&
					/^[0-9+\s()\-]+$/.test(this.$el.value)
				) {
					this.$el.value = '';
				} else if (
					this.$el.value.length === 18 &&
					/^[0-9+\s()\-]+$/.test(this.$el.value)
				) {
					this.$el.closest('.input-form').classList.remove('--error');
					return;
				} else {
					if (this.$el.value.includes('@') && this.$el.value.includes('.')) {
						this.$el.closest('.input-form').classList.remove('--error');
					} else {
						this.$el.closest('.input-form').classList.add('--error');
					}
				}
			});

			this.$el.addEventListener('input', () => {
				if (!/^[0-9+\s()\-]+$/.test(this.$el.value)) {
					if (this.$el.value[1] === '7') {
						this.$el.value = this.$el.value.replace('7', '');
					}
					this.$el.value = this.$el.value.replace(/[\s()]+|\+/g, '');
				} else return;
			});
		},
	}));
	Alpine.start();
});

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
