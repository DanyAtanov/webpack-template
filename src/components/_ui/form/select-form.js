import SlimSelect from 'slim-select';

let selectInit = (() => {
	const selects = document.querySelectorAll('.select-form');

	let selectInit = () => {
		selects.forEach((select) => {
			select = new SlimSelect({
				select: select,
				settings: {
					showSearch: false,
					searchPlaceholder: 'Search',
					searchText: 'No Results',
					searchingText: 'Searching...',
					searchHighlight: false,
					closeOnSelect: true,
					contentLocation: document.body,
					contentPosition: 'static',
					openPosition: 'auto', // options: auto, up, down
					placeholderText: 'Select Value',
					allowDeselect: false,
					hideSelected: false,
					showOptionTooltips: false,
					minSelected: 0,
					maxSelected: 1000,
					timeoutDelay: 200,
					maxValuesShown: 20,
					maxValuesMessage: '{number} selected',
				},
			});

			select?.select?.select.classList.add('_is-loaded');
		});
	};

	let init = () => {
		if (selects.length === 0) return;

		selectInit();
		_setupListeners();
	};

	let _setupListeners = () => {};

	init();
})();
