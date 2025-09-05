export default function scrollToSection(selector) {
	return {
		init() {
			this.$el.addEventListener('click', (event) => {
				event.preventDefault();
				const section = document.querySelector(selector);

				if (section) {
					section.scrollIntoView({ behavior: 'smooth' });
				} else {
					console.log(
						'%c[AlpineJS] scrollToSection:',
						'color: red; font-weight: bold;',
						'Селектор не найдет'
					);
				}
			});
		},
	};
}
