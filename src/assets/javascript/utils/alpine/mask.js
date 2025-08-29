export default function mask() {
	return {
		init() {
			this.$el.addEventListener('blur', () => {
				if (this.$el.hasAttribute('data-inn')) return;

				// phone
				if (
					this.$el.value.length < 18 &&
					/^[0-9+\s()\-]+$/.test(this.$el.value)
				) {
					this.$el.value = '';
				} else if (
					this.$el.value.length === 18 &&
					/^[0-9+\s()\-]+$/.test(this.$el.value)
				) {
					this.$el.closest('.input-form')?.classList.remove('--error');
					return;
				} else {
					// email
					this.$el.setAttribute('type', 'email');
				}
			});

			this.$el.addEventListener('input', () => {
				if (!/^[0-9+\s()\-]+$/.test(this.$el.value)) {
					if (this.$el.value[1] === '7') {
						this.$el.value = this.$el.value.replace('7', '');
					}
					this.$el.value = this.$el.value.replace(/[\s()]+|\+/g, '');
				}
			});
		},
	};
}
