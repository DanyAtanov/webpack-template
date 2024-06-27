/**
 * Throttle
 * @param {number} timeout - временной шаг в мс
 * @param {function} callback - callback-функция
 */
export class Throttle {
	constructor(callback, timeout = 200) {
		if (typeof callback !== 'function') {
			throw new Error('callback должен быть функцией');
		}
		if (typeof timeout !== 'number' || timeout < 0) {
			throw new Error('timeout должен быть числом больше нуля');
		}

		this.defaultCallback = callback;
		this.defaulttimeout = timeout;
		this.throttlePause = false;
	}

	throttle(callback = this.defaultCallback, timeout = this.defaulttimeout) {
		if (this.throttlePause) return;

		this.throttlePause = true;
		setTimeout(() => {
			callback();
			this.throttlePause = false;
		}, timeout);
	}
}
