import { coordinate, IDetail } from './generator.interface';
import { Line, Arc, Circle } from './primitives';
import { writeFile } from 'node:fs';
import * as windows1251 from 'windows-1251';

// class XmlHeader {
// 	constructor() {}

// 	toString() {
// 		return `<?xml version="1.0" encoding="windows-1251"?>`;
// 	}
// }

function generate_1(): void {
	const H = 'H';
	const R = 'R';
	const W = 'W';

	const pimitives_1: (Line | Arc)[] = [
		new Line([0, 0], [0, `(${H} / 2) - ${R}`]),

		new Arc([0, 'H / 2'], `${R}`, '3 * M_PI / 2', 'M_PI / 2', false),
		new Line([0, '(H / 2) + R'], ['0', 'H']),
		new Line(['0', 'H'], ['(L / 2) - R', 'H']),

		new Arc(['L / 2', 'H'], 'R', 'M_PI', '0', false),

		new Line(['(L / 2) + R', 'H'], ['L', 'H']),
		new Line(['L', 'H'], ['L', '(H / 2) + R']),

		new Arc(['L', 'H / 2'], 'R', 'M_PI / 2', '3 * M_PI / 2', false),

		new Line(['L', '(H / 2) - R'], ['L', '0']),
		new Line(['L', '0'], ['(L / 2) + R', '0']),

		new Arc(['L / 2', '0'], 'R', '0', 'M_PI', false),

		new Line(['(L / 2) - R', 0], [0, 0]),
	];

	const xml_1 = pimitives_1.reduce((prev, curr) => prev + '' + curr + '', '');

	const params = `
	<params>
		<p name="L" desc="[мм] Ширина" default="500.0"></p>
		<p name="H" desc="[мм] Высота" default="300.0"></p>
		<p name="R" desc="[мм] Радиус" default="50.0"></p>
		<!-- <condition text="Ширина выреза должна быть меньша или равна половине ширине прямоугольника"><![CDATA[W2 <= W / 2]]></condition> -->
	</params>
	`;

	const figure_name = `_9 Прямоугольник угла с желобом`;
	const output = `
<?xml version="1.0" encoding="windows-1251"?>		
<template name="${figure_name}">
	${params}
<geom>
		${xml_1}
</geom>
</template>
		`;

	writeFile(`./src/${figure_name}.template`, output, (err) => {
		if (err) throw err;

		console.log(`file: "./src/${figure_name}.template" created`);
	});
}

// generate_1();

function generate_2(): void {
	const figure_name = `11 Прямоугольник отверстия болта`;

	const H = 'H';
	const R = 'R';
	const W = 'W';

	const pimitives: (Line | Arc | Circle)[] = [
		new Line([0, 0], [0, 'H']),
		new Line([0, 'H'], ['W', 'H']),
		new Line(['W', 'H'], ['W', '0']),
		new Line(['W', '0'], [0, 0]),

		new Circle(['L', 'L'], 'R'),

		new Circle(['L', 'H - L'], 'R'),

		new Circle(['W - L', 'H - L'], 'R'),

		new Circle(['W - L', 'L'], 'R'),
	];

	const xml_1 = pimitives.reduce((prev, curr) => prev + '' + curr + '', '');

	const params = `
	<params>
		<p name="W" desc="[мм] Ширина" default="500.0"></p>
		<p name="H" desc="[мм] Высота" default="300.0"></p>
		<p name="L" desc="[мм] Отступ радиуса от края" default="50.0"></p>
		<p name="R" desc="[мм] Радиус" default="20.0"></p>

		<!-- <condition text="Ширина выреза должна быть меньша или равна половине ширине прямоугольника"><![CDATA[W2 <= W / 2]]></condition> -->
	</params>
	`;

	const output = `
<?xml version="1.0" encoding="windows-1251"?>		
<template name="${figure_name}">
	${params}
<geom>
		${xml_1}
</geom>
</template>
		`;

	writeFile(`../${figure_name}.template`, output, (err) => {
		if (err) throw err;

		console.log(`file: "../${figure_name}.template" created`);
	});
}

generate_2();
