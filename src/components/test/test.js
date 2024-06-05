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

const totalAll = (...numbers) => {
	const sum = numbers.reduce((result, numbers) => {
		return result + numbers;
	});

	return sum**3
};

console.log(totalAll(1, 2, 3)); 


