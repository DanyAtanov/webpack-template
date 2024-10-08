const $chess = document.createElement('table');
$chess.classList.add('chess');
document.querySelector('.layout__content').appendChild($chess);

const $row = document.createElement('tr');
const $cell = document.createElement('td');

$cell.style.width = '50px;';
$cell.style.height = '50px;';

for (let i = 0; i < 8; i++) {
	let newRow = $chess.appendChild($row.cloneNode(true));

	for (let j = 0; j < 8; j++) {
		if (j % 2 === 0) {
			newRow.appendChild($cell.cloneNode(true)).classList.add('black');
		} else {
			newRow.appendChild($cell.cloneNode(true));
		}
	}
}
