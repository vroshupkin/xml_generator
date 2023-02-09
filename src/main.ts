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
		<p name="DELTA" desc="[мм] Отступ от центра для центральных радиусов" default="50.0"></p>
		

		<condition text="Радиус должен быть меньше отступа от края"><![CDATA[R < L]]></condition>
        <condition text="Высота должна быть больше двойной суммы радиуса и отступа"><![CDATA[H > 2 * (L + R)]]></condition>
        <condition text="Ширина должна быть больше двойной суммы радиуса и отступа"><![CDATA[W > 2 * (L + R)]]></condition>

		<condition text="Центральный радиус должен быть меньше половины высоты"><![CDATA[R1 < H / 2]]></condition>
		<condition text="Центральный радиус должен быть меньше половины ширины"><![CDATA[R1 < W / 2]]></condition>

		<condition text="Центральные радиусы должны вмешаться в прямоугольник по высоте"><![CDATA[R2 + SQRT(2) * R2 < H / 2]]></condition>
		<condition text="Центральные радиусы должны вмешаться в прямоугольник по ширины"><![CDATA[R2 + SQRT(2) * R2 < W / 2]]></condition>

		<condition text="Центральные радиусы не должны соприкосаться с внутренним "><![CDATA[R1 < DELTA + (-R2) + SQRT(2) * R2]]></condition>
		

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

		new LinePath([
			['((W - W2) / 2)', '((H - H2) / 2)'],
			['((W - W2) / 2)', '((H - H2) / 2) + H2'],
			['((W - W2) / 2) + W2', '((H - H2) / 2) + H2'],
			['((W - W2) / 2) + W2', '((H - H2) / 2)'],
			['((W - W2) / 2)', '((H - H2) / 2)'],
		]),

		new Circle(['L', 'L'], 'R'),
		new Circle(['L', 'H - L'], 'R'),

		new Circle(['W - L', 'H - L'], 'R'),

		new Circle(['W - L', 'L'], 'R'),
	],
	params: `
	<params>
		<p name="W" desc="[мм] Ширина внешнего прямоугольника" default="500.0"></p>
		<p name="H" desc="[мм] Высота внешнего прямоугольника" default="300.0"></p>

		<p name="W2" desc="[мм] Ширина внутреннего прямоугольника" default="250.0"></p>
		<p name="H2" desc="[мм] Высота внутреннего прямоугольника" default="150.0"></p>


		<p name="L" desc="[мм] Отступ радиуса от края" default="50.0"></p>
		<p name="R" desc="[мм] Радиус" default="20.0"></p>

		<condition text="Радиус должен быть меньше отступа от края"><![CDATA[R < L]]></condition>
        <condition text="Высота должна быть больше двойной суммы радиуса и отступа"><![CDATA[H > 2 * (L + R)]]></condition>
        <condition text="Ширина должна быть больше двойной суммы радиуса и отступа"><![CDATA[W > 2 * (L + R)]]></condition>

		<condition text="Внутрений прямоугольник должен вмешаться по высоте"><![CDATA[H > H2]]></condition>
		<condition text="Внутрений прямоугольник должен вмешаться по ширине"><![CDATA[W > W2]]></condition>



	</params>
	`,
};

const figure_14: IGenerate = {
	name: `_14 Раздел дуги`,
	primitives: [
		new LineXML([0, 0], ['(-COS(ANGLE) * H)', '(SIN(ANGLE) * H)']),

		// new Arc(['0', '0'], 'H', '(M_PI + (ANGLE * M_PI) / 180))', '(ANGLE * M_PI) / 180', false),
		new Arc(['L / 2', 'H / 2'], 'H', '(M_PI/2) + M_PI * ANGLE/(2 * 180)', 'M_PI', true),
		new LineXML(['(L + COS(ANGLE) * H)', '(SIN(ANGLE) * H)'], ['L', 0]),
		new LineXML(['L', 0], [0, 0]),
	],
	params: `
	<params>
		<p name="ANGLE" desc="[градусы] Разворот дуги" default="60.0"></p>
		<p name="L" desc="[мм] Ширина дуги" default="100.0"></p>
		<p name="H" desc="[мм] Высота дуги" default="50.0"></p>




	</params>
	`,
};

const figure_15: IGenerate = {
	name: `_15 Угловое соединение`,
	primitives: [
		new LineXML([0, 'R'], [0, 'H']),
		new LineXML([0, 'H'], ['W', 0]),
		new LineXML(['W', 0], ['R', 0]),

		new Arc([0, 0], 'R', '0', 'M_PI / 2', false),
	],
	params: `
	<params>
		<p name="R" desc="[мм] Радиус" default="20.0"></p>
		<p name="W" desc="[мм] Ширина" default="200.0"></p>
		<p name="H" desc="[мм] Высота" default="100.0"></p>

		<condition text="Радиус должен быть меньше ширины"><![CDATA[1.1 * R < W]]></condition>
		<condition text="Радиус должен быть меньше высоты"><![CDATA[1.1 * R < H]]></condition>
	
	</params>


	`,
};

const figure_16: IGenerate = {
	name: `_16 Усеченые прямоугольник`,
	primitives: [
		new LineXML([0, 'R'], [0, 'H']),
		new LineXML([0, 'H'], ['W', 0]),
		new LineXML(['W', 0], ['R', 0]),
		new LineXML(['R', 0], [0, 'R']),
	],
	params: `
	<params>
		<p name="R" desc="[мм] Ширина и высота усечения" default="50.0"></p>
		<p name="W" desc="[мм] Ширина" default="200.0"></p>
		<p name="H" desc="[мм] Высота" default="100.0"></p>

		<condition text="Ширина усечения должена быть меньше ширины фигуры"><![CDATA[1.1 * R < W]]></condition>
		<condition text="Высота усечения должена быть меньше высоты фигуры"><![CDATA[1.1 * R < H]]></condition>
	
	</params>


	`,
};

const figure_17: IGenerate = {
	name: `_17 Вогнутый правильный треугольник`,
	primitives: [
		new LinePath([
			['W', 'L'],
			['W', 0],
			[0, 0],
			[0, 'W'],
			['L', 'W'],
		]),
		new Arc(['W', 'W'], 'W - L', 'M_PI', '3 * M_PI / 2', false),
	],
	params: `
	<params>
		
		<p name="W" desc="[мм] Ширина" default="200.0"></p>
		<p name="L" desc="[мм] Отступ" default="10.0"></p>
		
		<condition text="Отступ должен быть меньше ширины"><![CDATA[L < W]]></condition>
		<condition text="Отступ не должен быть равен 0"><![CDATA[L > 0]]></condition>
	</params>


	`,
};

const figure_18_1: IGenerate = {
	name: `_18_1 Прямоугольный треугольник по двум сторонам`,
	primitives: [
		new LinePath([
			[0, 0],
			[0, 'H'],
			['L', 0],
			[0, 0],
		]),
	],
	params: `
	<params>
		
		<p name="H" desc="[мм] Высота" default="50.0"></p>
		<p name="L" desc="[мм] Ширина" default="100.0"></p>
		

	</params>


	`,
};

const figure_18_2: IGenerate = {
	name: `_18_2 Прямоугольный треугольник по высоте и углу прилегающему к ширине`,
	primitives: [
		new LinePath([
			[0, 0],
			[0, 'H'],
			['H * COS(A)/SIN(A)', 0],
			[0, 0],
		]),
	],
	params: `
	<params>
		
		<p name="H" desc="[мм] Высота" default="50.0"></p>
		<p name="A" desc="[градусы] Угол прилегающий к ширине" default="45"></p>
		
		<condition text="Угол не должен быть больше 90"><![CDATA[A < 90]]></condition>
	</params>


	`,
};

const figure_19_1__cos = `((a * a + b * b - c * c) / (2 * a * b))`;
const figure_19_1__x = `b * ${figure_19_1__cos}`;
const figure_19_1__y = `b * SQRT(1 - (${figure_19_1__cos} * ${figure_19_1__cos}))`;

const figure_19_1: IGenerate = {
	name: `_19_1 Общий треугольник по трем сторонам`,
	primitives: [
		new LinePath([
			[0, 0],
			[`${figure_19_1__x}`, `${figure_19_1__y}`],
			['a', 0],
			[0, 0],
		]),
	],
	params: `
	<params>
		<p name="a" desc="[мм] Основание" default="50.0"></p>
		<p name="b" desc="[мм] Левая сторона" default="50.0"></p>
		<p name="c" desc="[мм] Правая сторона" default="50.0"></p>
		
		<condition text="Основание должно быть меньше суммы двух других сторон"><![CDATA[a < b + c]]></condition>
		<condition text="Левая сторона должна быть меньше суммы двух других сторон"><![CDATA[b < a + c]]></condition>
		<condition text="Правая сторона должно быть меньше суммы двух других сторон"><![CDATA[c < b + a]]></condition>
	</params>


	`,
};

// generate(figure_11);
// generate(figure_12);
// generate(figure_13);
// generate(figure_14);
// generate(figure_15);

// generate(figure_16);
// generate(figure_17);

generate(figure_18_1);
generate(figure_18_2);
generate(figure_19_1);
