export default function countdown(startStr, deadlineStr) {
	return {
		isActive: true,
		startUTC: null,
		deadlineUTC: null,
		days: 0,
		hours: 0,
		minutes: 0,
		progress: 0,
		interval: null,
		status: 'soon',
		radius: 0,
		centerX: 0,
		centerY: 0,

		start() {
			const [startDay, startMonth, startYear] = startStr.split('-').map(Number);
			const [endDay, endMonth, endYear] = deadlineStr.split('-').map(Number);

			this.startUTC =
				Date.UTC(startYear, startMonth - 1, startDay, 0, 0, 0) -
				3 * 60 * 60 * 1000; // UTC+3 (MSK)
			this.deadlineUTC =
				Date.UTC(endYear, endMonth - 1, endDay, 23, 59, 59) -
				3 * 60 * 60 * 1000;

			this.$nextTick(() => {
				const circle = this.$refs.circle;
				const counter = this.$refs.counter;
				this.radius = circle.offsetWidth / 2;
				this.centerX = counter.offsetWidth / 2;
				this.centerY = counter.offsetHeight / 2;
			});

			this.update();
			this.interval = setInterval(() => this.update(), 60 * 1000); // Обновление раз в минуту
		},

		update() {
			const now = Date.now();

			if (now < this.startUTC) {
				this.setInactive('soon', 0);
				return;
			}

			if (now > this.deadlineUTC) {
				this.setInactive('expired', 100);
				return;
			}

			this.status = 'active';
			const total = this.deadlineUTC - this.startUTC;
			const elapsed = now - this.startUTC;
			this.progress = Math.min(Math.floor((elapsed / total) * 100), 100);

			const remaining = this.deadlineUTC - now;
			this.days = Math.floor(remaining / (1000 * 60 * 60 * 24));
			const rest = remaining % (1000 * 60 * 60 * 24);
			this.hours = Math.floor(rest / (1000 * 60 * 60));
			this.minutes = Math.floor((rest % (1000 * 60 * 60)) / (1000 * 60));
		},

		setInactive(newStatus, newProgress) {
			this.status = newStatus;
			this.progress = newProgress;
			this.days = this.hours = this.minutes = 0;
			clearInterval(this.interval);
		},

		getDotPosition() {
			if (!this.radius || this.progress === 0) return 'left: 0; top: 0;';

			const angle = (this.progress * 3.6 - 90) * (Math.PI / 180); // Угол в радианах, начало с 12 часов
			// смещение от центра: радиус минус половина толщины линии
			const lineWidth = this.radius - this.$refs.time.offsetWidth / 2;
			const effectiveRadius = this.radius - lineWidth / 2;

			const x = this.centerX + effectiveRadius * Math.cos(angle) - 18;
			const y = this.centerY + effectiveRadius * Math.sin(angle) - 18;

			return `position: absolute; left: ${x}px; top: ${y}px;`;
		},

		pluralize(number, words) {
			const cases = [2, 0, 1, 1, 1, 2];
			return words[
				number % 100 > 4 && number % 100 < 20
					? 2
					: cases[Math.min(number % 10, 5)]
			];
		},

		dayString() {
			return this.pluralize(this.days, ['день', 'дня', 'дней']);
		},

		hourString() {
			return this.pluralize(this.hours, ['час', 'часа', 'часов']);
		},

		minuteString() {
			return this.pluralize(this.minutes, ['минута', 'минуты', 'минут']);
		},
	};
}
