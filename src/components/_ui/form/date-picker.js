import AirDatepicker from 'air-datepicker';

const datePicker = (() => {
	const datePickers = document.querySelectorAll('.date-picker input');

	let init = () => {
		if (datePickers.length === 0) return;

		datePickers.forEach((datepicker) => {
			let picker;

			picker = new AirDatepicker(datepicker, {
				maxDate: new Date(),
				//selectedDates: [new Date()],
				dateFormat: 'dd.MM.yyyy',
				/* 			onSelect(date, formattedDate, datepicker) {
					console.log(date);
					datepicker?.closest('.input-form').classList.add('--valid');
				}, */
			});

			datepicker.addEventListener('blur', () => {
				picker.selectDate(parseDate(datepicker.value));

				if (datepicker.value.length < 10) {
					datepicker.value = null;
					console.log(datepicker.value);
					/* 					datepicker?.closest('.input-form').classList.remove('--valid');
					datepicker?.closest('.input-form').classList.add('--error'); */
				}
			});
		});

		_setupListeners();
	};

	function parseDate(dateString) {
		const [day, month, year] = dateString.split('.').map(Number);
		return new Date(year, month - 1, day);
	}

	let _setupListeners = () => {};

	init();
})();
