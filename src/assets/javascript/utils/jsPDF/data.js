export const template = document.querySelector('#pdf-template');

export const data = [
	{
		name: 'num',
		val: 169,
		el: template.querySelector('.template-num'),
	},
	{
		name: 'date',
		val: new Date().toLocaleDateString(),
		el: template.querySelector('.template-date'),
	},
	{
		name: 'inn',
		val: 780909090909,
		el: template.querySelector('.template-user-inn'),
	},
	{
		name: 'kpp',
		val: 6400090900,
		el: template.querySelector('.template-user-kpp'),
	},
	{
		name: 'company',
		val: 'ООО Бутырка',
		el: template.querySelector('.template-company'),
	},
];
