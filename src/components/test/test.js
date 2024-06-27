/* console.log('TEST');

const money = 120000;
const income = 'Фриланс';
const addExpenses = 'Интернет, такси, коммуналка';
const deposit = false;
const mission = 1000000;
const period = 12;

const num = 266219;

const numArr = num.toString().split('');

const total = numArr.reduce((total, number) => {
	return total * Number(number);
}); */

/* const bankAccounts = [
	{ id: '123', amount: 19 },
	{ id: '345', amount: 33 },
	{ id: '567', amount: 4 },
	{ id: '789', amount: 20 },
];

const totalAmount = bankAccounts.reduce((total, amount) => {
	return total + amount.amount;
}, 0);

console.log(totalAmount); */

/* const totalAll = (...numbers) => {
	const sum = numbers.reduce((result, numbers) => {
		return result + numbers;
	});

	return sum**3
};

console.log(totalAll(1, 2, 3));  */

/* class User {
	constructor(name) {
		if (name.length < 4) {
			console.log('Имя слишком короткое');
		} else {
			this.name = name;
		}
	}

	sayHi() {
		console.log(`Hello, ${this.name}`);
	}
}

const danis = new User('danis');
danis.sayHi();  */

/* class Slider {
	constructor(element) {
		this.element = element;
	}

	init() {
		new Swiper(this.element, {

		})
	}
} */

// динамический импорт. ВАРИАНТ 1
/* if (document.querySelectorAll('.countdown').length) {
	await import('../../assets/javascript/utils/countdown')
		.then((module) => {
			module.Countdown;

			const counter = new module.Countdown('.countdown', 1000, 3000);
			counter.init();
		})
		.catch((err) => {
			console.log('Ошибка загрузки модуля:', err);
		});
} */

// Динамический импорт. ВАРИАНТ 2
if (document.querySelectorAll('.countdown').length) {
	let { countdown } = await import('../../assets/javascript/utils/countdown');
	let { isInViewport } = await import(
		'../../assets/javascript/utils/isInViewport'
	);

	isInViewport('.countdown', () => {
		countdown('.countdown', 2000, 1000);
	});
}
