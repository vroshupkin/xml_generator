import { generate, IGenerate } from '../generator';
import { coordinate, IDetail } from './generator.interface';
import { LineXML, Arc, Circle, linePath, LinePath, Rotate } from './primitives';

// function generate_1(): void {
// 	const H = 'H';
// 	const R = 'R';
// 	const W = 'W';

// 	const pimitives_1: (Line | Arc)[] = [
// 		new Line([0, 0], [0, `(${H} / 2) - ${R}`]),

// 		new Arc([0, 'H / 2'], `${R}`, '3 * M_PI / 2', 'M_PI / 2', false),
// 		new Line([0, '(H / 2) + R'], ['0', 'H']),
// 		new Line(['0', 'H'], ['(L / 2) - R', 'H']),

// 		new Arc(['L / 2', 'H'], 'R', 'M_PI', '0', false),

// 		new Line(['(L / 2) + R', 'H'], ['L', 'H']),
// 		new Line(['L', 'H'], ['L', '(H / 2) + R']),

// 		new Arc(['L', 'H / 2'], 'R', 'M_PI / 2', '3 * M_PI / 2', false),

// 		new Line(['L', '(H / 2) - R'], ['L', '0']),
// 		new Line(['L', '0'], ['(L / 2) + R', '0']),

// 		new Arc(['L / 2', '0'], 'R', '0', 'M_PI', false),

// 		new Line(['(L / 2) - R', 0], [0, 0]),
// 	];

// 	const xml_1 = pimitives_1.reduce((prev, curr) => prev + '' + curr + '', '');

// 	const params = `
// 	<params>
// 		<p name="L" desc="[мм] Ширина" default="500.0"></p>
// 		<p name="H" desc="[мм] Высота" default="300.0"></p>
// 		<p name="R" desc="[мм] Радиус" default="50.0"></p>
// 		<!-- <condition text="Ширина выреза должна быть меньша или равна половине ширине прямоугольника"><![CDATA[W2 <= W / 2]]></condition> -->
// 	</params>
// 	`;

// 	const figure_name = `_9 Прямоугольник угла с желобом`;
// 	const output = `
// <?xml version="1.0" encoding="windows-1251"?>
// <template name="${figure_name}">
// 	${params}
// <geom>
// 		${xml_1}
// </geom>
// </template>
// 		`;

// 	writeFile(`./src/${figure_name}.template`, output, (err) => {
// 		if (err) throw err;

// 		console.log(`file: "./src/${figure_name}.template" created`);
// 	});
// }

interface IParams {
	tag: 'p' | 'condition';
	obj: IParam_p | IParam_condition;

	name: string;
	desc: string;
	default?: string | number;
}

interface IParam_p {
	tag: 'p';
	name: string;
	desc: string;
	default: string | number;
}

interface IParam_condition {
	tag: 'condition';
	text: string;
	body: string;
}

const figure_11: IGenerate = {
	name: `_11 Прямоугольник отверстия болта`,
	primitives: [
		new LineXML([0, 0], [0, 'H']),
		new LineXML([0, 'H'], ['W', 'H']),
		new LineXML(['W', 'H'], ['W', '0']),
		new LineXML(['W', '0'], [0, 0]),

		new Circle(['L', 'L'], 'R'),

		new Circle(['L', 'H - L'], 'R'),

		new Circle(['W - L', 'H - L'], 'R'),

		new Circle(['W - L', 'L'], 'R'),
	],
	params: `
	<params>
		<p name="W" desc="[мм] Ширина" default="500.0"></p>
		<p name="H" desc="[мм] Высота" default="300.0"></p>
		<p name="L" desc="[мм] Отступ радиуса от края" default="50.0"></p>
		<p name="R" desc="[мм] Радиус" default="20.0"></p>

		<condition text="Радиус должен быть меньше отступа от края"><![CDATA[R < L]]></condition>
        <condition text="Высота должна быть больше двойной суммы радиуса и отступа"><![CDATA[H > 2 * (L + R)]]></condition>
        <condition text="Ширина должна быть больше двойной суммы радиуса и отступа"><![CDATA[W > 2 * (L + R)]]></condition>
	</params>
	`,
};

const figure_12: IGenerate = {
	name: `_12 Прямоугольная округлая кромка`,
	primitives: [
		new LinePath([
			[0, 0],
			[0, 'H'],
			['W', 'H'],
			['W', '0'],
			['0', '0'],
		]),
		new Circle(['L', 'L'], 'R'),
		new Circle(['L', 'H - L'], 'R'),
		new Circle(['W - L', 'H - L'], 'R'),
		new Circle(['W - L', 'L'], 'R'),

		new Circle(['W / 2', 'H / 2'], 'R1'),

		new Circle(['(DELTA) + (R2 * SQRT(2)) + W / 2', 'H / 2'], 'R2'),
		new Circle(['(-DELTA) + (-R2 * SQRT(2)) + W / 2', 'H / 2'], 'R2'),
		new Circle(['W / 2', '(DELTA) + (R2 * SQRT(2)) + H / 2'], 'R2'),
		new Circle(['W / 2', '(-DELTA) + (-R2 * SQRT(2)) + H / 2'], 'R2'),
	],
	params: `
	<params>
		<p name="W" desc="[мм] Ширина" default="500.0"></p>
		<p name="H" desc="[мм] Высота" default="300.0"></p>
		<p name="L" desc="[мм] Отступ радиуса от края" default="50.0"></p>
		<p name="R" desc="[мм] Угловые радиусы" default="20.0"></p>
		<p name="R1" desc="[мм] Центральный радиус" default="50.0"></p>

		<p name="R2" desc="[мм] Центральные радиусы" default="20.0"></p>
		<p name="DELTA" desc="[мм] Отступ от центра для центральных радиусов" default="20.0"></p>
		

		<condition text="Радиус должен быть меньше отступа от края"><![CDATA[R < L]]></condition>
        <condition text="Высота должна быть больше двойной суммы радиуса и отступа"><![CDATA[H > 2 * (L + R)]]></condition>
        <condition text="Ширина должна быть больше двойной суммы радиуса и отступа"><![CDATA[W > 2 * (L + R)]]></condition>

		<condition text="Центральный радиус должен быть меньше половины высоты"><![CDATA[R1 < H / 2]]></condition>
		<condition text="Центральный радиус должен быть меньше половины ширины"><![CDATA[R1 < W / 2]]></condition>

		<condition text="Центральные радиусы должны вмешаться в прямоугольник по высоте"><![CDATA[DELTA + R2 + SQRT(2) * R2 < H / 2]]></condition>
		<condition text="Центральные радиусы должны вмешаться в прямоугольник по ширины"><![CDATA[DELTA + R2 + SQRT(2) * R2 < W / 2]]></condition>

	</params>
	`,
};

const figure_13: IGenerate = {
	name: `_13 Прямоугольная прямоугольная кромка`,
	primitives: [
		new LinePath([
			[0, 0],
			[0, 'H'],
			['W', 'H'],
			['W', '0'],
			['0', '0'],
		]),

		new Circle(['L', 'L'], 'R'),
		new Circle(['L', 'H - L'], 'R'),

		new Circle(['W - L', 'H - L'], 'R'),

		new Circle(['W - L', 'L'], 'R'),
	],
	params: `
	<params>
		<p name="W" desc="[мм] Ширина" default="500.0"></p>
		<p name="H" desc="[мм] Высота" default="300.0"></p>
		<p name="L" desc="[мм] Отступ радиуса от края" default="50.0"></p>
		<p name="R" desc="[мм] Радиус" default="20.0"></p>

		<condition text="Радиус должен быть меньше отступа от края"><![CDATA[R < L]]></condition>
        <condition text="Высота должна быть больше двойной суммы радиуса и отступа"><![CDATA[H > 2 * (L + R)]]></condition>
        <condition text="Ширина должна быть больше двойной суммы радиуса и отступа"><![CDATA[W > 2 * (L + R)]]></condition>
	</params>
	`,
};

generate(figure_11);
generate(figure_12);
generate(figure_13);
