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

export let animateTilt = (selector = '[data-tilt]') => {
	const cards = document.querySelectorAll(selector);
	if (!cards.length) return;

	const createQuickTo = (target, property) =>
		gsap.quickTo(target, property, {
			duration: 0.35,
			ease: 'power2.out',
		});

	cards.forEach((card) => {
		const outer = card.querySelector('[data-tilt-outer]') || card;
		const inner = card.querySelector('[data-tilt-inner]');

		// Настройки из data-атрибутов
		const perspective = Number(card.dataset.tilt) || 950;
		const maxRotation = Number(card.dataset.outer) || 10;
		const maxOffset = Number(card.dataset.inner) || 15;

		gsap.set(card, { perspective });

		const animate = {
			rotateX: createQuickTo(outer, 'rotationX'),
			rotateY: createQuickTo(outer, 'rotationY'),
			moveX: inner ? createQuickTo(inner, 'x') : null,
			moveY: inner ? createQuickTo(inner, 'y') : null,
		};

		const handleMove = ({ clientX, clientY }) => {
			const { left, top, width, height } = card.getBoundingClientRect();

			const x = (clientX - left) / width;
			const y = (clientY - top) / height;

			animate.rotateX(gsap.utils.interpolate(maxRotation, -maxRotation, y));
			animate.rotateY(gsap.utils.interpolate(-maxRotation, maxRotation, x));

			if (inner) {
				animate.moveX(gsap.utils.interpolate(-maxOffset, maxOffset, x));
				animate.moveY(gsap.utils.interpolate(-maxOffset, maxOffset, y));
			}
		};

		const resetTilt = () => {
			animate.rotateX(0);
			animate.rotateY(0);

			if (inner) {
				animate.moveX(0);
				animate.moveY(0);
			}
		};

		card.addEventListener('pointermove', handleMove);
		card.addEventListener('pointerleave', resetTilt);
	});
};
