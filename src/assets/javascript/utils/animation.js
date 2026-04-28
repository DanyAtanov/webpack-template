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

export let animateInList = () => {
	const animateElemets = document.querySelectorAll('.--animate-in-list');

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

				tl.to(item.querySelectorAll('li'), {
					y: '0',
					opacity: 1,
					force3D: true,
					duration: 0.8,
					delay: 0.2,
					stagger: item.querySelectorAll('li').length > 4 ? 0.06 : 0.2,
					onStart: () => {
						ScrollTrigger.refresh();
					},
					onComplete: () => {
						item.classList.remove('--animate-in-list');
					},
				});
			});
		});
	};

	init();
};

export let animateSkew = () => {
	gsap.registerPlugin(ScrollTrigger);
	let proxy = { skew: 0 };
	const skewSetter = gsap.quickSetter('.--skew', 'skewY', 'deg'); // fast
	let clamp = gsap.utils.clamp(-2, 2); // don't let the skew go beyond 20 degrees.

	ScrollTrigger.create({
		onUpdate: (self) => {
			let skew = clamp(self.getVelocity() / -300);
			if (Math.abs(skew) > Math.abs(proxy.skew)) {
				proxy.skew = skew;
				gsap.to(proxy, {
					skew: 0,
					duration: 0.8,
					ease: 'power3',
					overwrite: true,
					onUpdate: () => skewSetter(proxy.skew),
				});
			}
		},
	});

	gsap.set('.--skew', { transformOrigin: 'right center', force3D: true });
};
