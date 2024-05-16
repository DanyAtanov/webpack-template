import { jsPDF } from 'jspdf';
import { RobotoStringBase64 } from './RobotoStringBase64';
import { template, data } from './data';

const generatePDF = (() => {
	let buttons = document.querySelectorAll('.generate-pdf');

	let init = () => {
		if (!buttons.length) return;

		_setupListeners();
	};

	const generateFile = () => {
		const pdf = new jsPDF('p', 'px', 'a4');

		data.forEach((item) => {
			item.el.innerHTML = item.val;
		});

		pdf.addFileToVFS('Roboto.ttf', RobotoStringBase64);
		pdf.addFont('Roboto.ttf', 'Roboto', 'normal');
		pdf.setFont('Roboto');

		pdf.html(template, {
			callback: function (pdf) {
				pdf.save('example');
			},
			x: 10,
			y: 10,
			autoPaging: true,
			html2canvas: {
				encoding: 'utf-8',
				scale: 0.275,
			},
		});
	};

	let _setupListeners = () => {
		buttons.forEach((button) => {
			button.addEventListener('click', generateFile);
		});
	};

	init();
})();
