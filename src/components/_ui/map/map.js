const initMap = (() => {
	const mapContainer = document.querySelector('#yandex-map');
	let locations = [
		{
			coodrs: [59.988001, 30.276773],
			hintContent: 'Центральный офис Санкт-Петербург',
		},
		{
			coodrs: [55.913777, 37.763351],
			hintContent: 'Филиал Москва',
		},
		{
			coodrs: [54.738375, 55.898127],
			hintContent: 'Филиал Уфа (Өфө филиалы)',
		},
		{
			coodrs: [45.024883, 39.010231],
			hintContent: 'Филиал Краснодар',
		},
	];

	let init = () => {
		if (!mapContainer) return;

		console.log('map');

		initMap();

		_setupListeners();
	};

	let initMap = () => {
		ymaps.ready(function () {
			let map = new ymaps.Map(
				mapContainer,
				{
					center: [59.987878, 30.273834],
					zoom: 16,
					controls: [],
				}
				/* 	{
				searchControlProvider: 'yandex#search',
			} */
			);

			locations.forEach((location) => {
				let placemark = new ymaps.Placemark(
					location.coodrs,
					{
						hintContent: location.hint,
					},
					{
						iconLayout: 'default#image',
						iconImageHref: './assets/images/placemark.svg',
						iconImageSize: [41, 41],
						iconImageOffset: [-24, -36],
					}
				);

				map.geoObjects.add(placemark);
			});
		});
	};

	let _setupListeners = () => {};

	init();
})();
