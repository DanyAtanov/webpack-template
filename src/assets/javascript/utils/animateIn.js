import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export let animateIn = () => {
	const animateElemets = document.querySelectorAll('.--animate-in');

	let init = () => {
		if (!animateElemets.length) return;

		let mediaQuery = gsap.matchMedia();

		mediaQuery.add('(min-width: 1441px)', () => {
			gsap.registerPlugin(ScrollTrigger);
			gsap.ticker.lagSmoothing(500, 33);

			animateElemets.forEach((item) => {
				const tl = gsap.timeline({
					ease: 'Expo',
					scrollTrigger: {
						trigger: item,
						start: 'top bottom',
					},
				});

				tl.to(item, {
					y: '0',
					opacity: 1,
					force3D: true,
					duration: 0.8,
					delay: 0.2,
					onStart: () => {
						ScrollTrigger.refresh();
					},
					onComplete: () => {
						item.classList.remove('--animate-in');
					},
				});
			});
		});
	};

	init();
};
