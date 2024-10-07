const initMap = (() => {
	const map = document.querySelector('#yandex-map');
	let myMap;
	let myPlacemark;

	let init = () => {
		if (!map) return;

		ymaps.ready(function () {
			myMap = new ymaps.Map(
				map,
				{
					center: [59.987878, 30.273834],
					zoom: 16,
					controls: [],
				}
				/* 	{
				searchControlProvider: 'yandex#search',
			} */
			);

			myPlacemark = new ymaps.Placemark(
				[59.988379, 30.276091],
				{
					hintContent: 'Jeta Industry',
				},
				{
					// Необходимо указать данный тип макета.
					iconLayout: 'default#image',
					// Своё изображение иконки метки.
					iconImageHref: './assets/images/map-marker.svg',
					// Размеры метки.
					iconImageSize: [74, 80],
					// Смещение левого верхнего угла иконки относительно
					// её "ножки" (точки привязки).
					iconImageOffset: [-24, -36],
				}
			);

			myMap.geoObjects.add(myPlacemark);
		});

		_setupListeners();
	};

	let _setupListeners = () => {};

	// Доступные методы

	init();
})();
