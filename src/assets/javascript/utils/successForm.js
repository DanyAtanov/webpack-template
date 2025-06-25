import Toastify from 'toastify-js';

let successForm = (() => {
	const forms = document.querySelectorAll('form:has(button[type="submit"])');
	let mediaQuery = window.matchMedia('(max-width: 1024px)');

	let init = () => {
		if (!forms.length) return;

		_setupListeners();
	};

	let showMessage = (event) => {
		event.preventDefault();
		let formData = {};
		let form = event.currentTarget;

		for (let i = 0; i < form.querySelectorAll('input').length; i++) {
			formData[form.querySelectorAll('input')[i].name] =
				form.querySelectorAll('input')[i].value;
		}

		console.log(formData);

		let xhr = new XMLHttpRequest();
		xhr.open('POST', 'https://dummyjson.com/http/201', true);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.send(JSON.stringify(formData));

		xhr.onload = function () {
			if (xhr.status == 201) {
				console.log(
					'Данные успешно отправлены на сервер:',
					JSON.parse(xhr.responseText)
				);

				event.target.closest('form').reset();
				Toastify({
					text: ' Заявка отправлена! Наш менеджер свяжется с вами в ближайшее время',
					duration: 3000,
					close: false,
					/* 		avatar: mediaQuery.matches
						? false
						: './assets/images/svg/success.svg', */
					gravity: mediaQuery.matches ? 'bottom' : 'top', // `top` or `bottom`
					position: mediaQuery.matches ? 'center' : 'right', // `left`, `center` or `right`
					stopOnFocus: true, // Prevents dismissing of toast on hover
					style: {
						color: '#000',
						background: '#FFFFFF',
						boxShadow: '4px 16px 43.4px 0px rgba(4, 10, 32, 0.08)',
						borderRadius: '20px',
						padding: '20px 30px',
						marginTop: mediaQuery.matches ? '0' : '108px',
						marginBottom: mediaQuery.matches ? '50px' : '0',
					},
				}).showToast();

				closeModal();
			} else {
				console.error('Произошла ошибка при отправке данных на сервер.');
			}
		};

		xhr.onerror = function () {
			console.error('Ошибка сети при отправке запроса.');
		};
	};

	let closeModal = () => {
		const opentModal = document.querySelector('dialog[open]');

		if (opentModal) {
			opentModal.close();
		}
	};

	let _setupListeners = () => {
		forms.forEach((form) => {
			form.addEventListener('submit', showMessage);
		});
	};

	init();
})();
