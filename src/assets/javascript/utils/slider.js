/**
 * Простой слайдер
 * @param {string} selector - Селектор слайдера
 * @param {boolean} navigation - Навигация (если есть)
 */

import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
export class Slider {
	constructor(selector, navigation = false) {
		this.selector = selector;
		this.navigation = navigation ? true : false;
	}

	init() {
		let selector = this.selector;
		let nav = this.navigation ? this.navigation : false;

		new Swiper(selector, {
			modules: nav ? [Navigation] : [],
			loop: false,
			speed: 600,
			longSwipesRatio: 0.3,
			watchSlidesProgress: true,
			on: {
				init: function () {
					this.el.classList.add('_is-loaded');
				},
			},
			navigation: nav
				? {
						nextEl: `${selector} .swiper-button-next`,
						prevEl: `${selector} .swiper-button-prev`,
					}
				: false,
		});
	}
}
