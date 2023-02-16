import { generate, IGenerate } from '../generator';
import { coordinate, IDetail } from './generator.interface';
import { LineXML, Arc, Circle, linePath, LinePath, Rotate } from './primitives';

class Condition {
	constructor(private text: string, private condition: string) {}

	toString(): string {
		return `<condition text="${this.text}"><![CDATA[${this.condition}]]></condition>`;
	}
}

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
		<p name="R" desc="[мм] Радиус" default="45.0"></p>
		<p name="W" desc="[мм] Ширина" default="200.0"></p>
		<p name="H" desc="[мм] Высота" default="130.0"></p>

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

const figure_19_2: IGenerate = {
	name: `_19_2 Общий треугольник по двум соторонам и углу между ними`,
	primitives: [
		new LinePath([
			[0, 0],
			['b * COS(angle)', 'b * SIN(angle)'],
			['a', 0],
			[0, 0],
		]),
	],
	params: `
	<params>
		
		<p name="a" desc="[мм] Основание" default="50.0"></p>
		<p name="b" desc="[мм] Левая сторона" default="50.0"></p>
		<p name="angle" desc="[градусы] Угол между сторонами" default="50.0"></p>

		<condition text="Правая сторона должно быть меньше суммы двух других сторон"><![CDATA[angle < 180]]></condition>
		
		
	</params>


	`,
};

const figure_20_elments = new LinePath([
	['l * COS(360 / n)', 'l * SIN(360 / n)'],
	['l * COS(360 / n + 360 / n)', 'l * SIN(360 / n + 360 / n)'],
]);

const figure_20: IGenerate = {
	name: `_20 Правильный многоульник`,
	primitives: [new Rotate([figure_20_elments], 0, '360 / n', 'n')],

	params: `
	<params>
		
		<p name="l" desc="[мм] Длина стороны" default="50.0"></p>
		<p name="n" desc="[кол-во] Количество сторон прямоугольника" default="6.0"></p>
		

		
	</params>


	`,
};

const figure_21: IGenerate = {
	name: `_21 U скоба`,
	primitives: [
		new LinePath([
			['-R', '0'],
			['-R', 'H1'],
			['-(R + W)', 'H1'],
			['-(R + W)', 0],
		]),
		new Arc([0, 0], 'R + W', 'M_PI', '0', false),

		new LinePath([
			['R + W', 0],
			['R + W', 'H2'],
			['R', 'H2'],
			['R', '0'],
		]),
		new Arc([0, 0], 'R', 'M_PI', '0', false),
	],

	params: `
	<params>	
		<p name="R" desc="[мм] Внутренний радиус" default="50.0"></p>
		<p name="W" desc="[мм] Ширина детали" default="20.0"></p>
		<p name="H1" desc="[мм] Высота части слева" default="40.0"></p>
		<p name="H2" desc="[мм] Высота части справа" default="70.0"></p>
		
		<condition text="Ширина детали должна быть больше нуля"><![CDATA[W > 0]]></condition>
		
		
	</params>


	`,
};

const figure_21_1_elments = new LinePath([
	['l * COS(360 / n)', 'l * SIN(360 / n)'],
	['l * COS(360 / n + 360 / n)', 'l * SIN(360 / n + 360 / n)'],
]);

const figure_21_1: IGenerate = {
	name: `_21_1 Правильный многоульник в окружности`,
	primitives: [new Rotate([figure_21_1_elments], 0, '360 / n', 'n'), new Circle([0, 0], 'l')],

	params: `
	<params>
		
		<p name="l" desc="[мм] Радиус" default="50.0"></p>
		<p name="n" desc="[кол-во] Количество сторон прямоугольника" default="4.0"></p>
		

		
	</params>


	`,
};

const figure_21_2: IGenerate = {
	name: `_21_2 Окружность в правильном многоугольнике`,
	primitives: [
		new Rotate([figure_21_1_elments], 0, '360 / n', 'n'),
		new Circle([0, 0], 'l * COS(180 / n)'),
	],

	params: `
	<params>
		<p name="l" desc="[мм] Сторона правильного многоугольника" default="50.0"></p>
		<p name="n" desc="[кол-во] Количество сторон прямоугольника" default="4.0"></p>
	</params>


	`,
};

const figure_22: IGenerate = {
	name: `_22 Четырехугольник`,
	primitives: [
		new LinePath([
			[0, 0],
			['x1', 'h1'],
			['x2', 'h2'],
			['x3', 'h3'],
			[0, 0],
		]),
	],

	params: `
	<params>	
		<p name="x1" desc="[мм] Ширина x1" default="10.0"></p>
		<p name="h1" desc="[мм] Высота h1" default="80.0"></p>

		<p name="x2" desc="[мм] Ширина x2" default="100.0"></p>
		<p name="h2" desc="[мм] Высота h2" default="60.0"></p>

		<p name="x3" desc="[мм] Ширина x3" default="100.0"></p>
		<p name="h3" desc="[мм] Высота h3" default="0.0"></p>
		
		
		
	</params>


	`,
};

const figure_24: IGenerate = {
	name: `_24 Лопасть`,
	primitives: [
		new Arc([0, 0], 'R', 'M_PI - ASIN(H / (2 * R))', 'M_PI + ASIN(H / (2 * R))', true),

		new LinePath([
			['-(SQRT(R * R - H * H / 4))', '-(H / 2)'],
			['-(R + W)', '-(H / 2)'],
			['-(R + W)', '(H / 2)'],
			['-(SQRT(R * R - H * H / 4))', '(H / 2)'],
		]),
	],

	params: `
	<params>	
		<p name="R" desc="[мм] Радиус" default="100.0"></p>
		
		<p name="W" desc="[мм] Длина" default="70.0"></p>
		<p name="H" desc="[мм] Высота" default="70.0"></p>
		
		
	</params>

	`,
};

const figure_0_1: IGenerate = {
	name: `_0_1 Окружность в прямоугольнике`,
	primitives: [
		new LinePath([
			[`-(W / 2)`, `-(H / 2)`],
			[`-(W / 2)`, `(H / 2)`],
			[`(W / 2)`, `(H / 2)`],
			[`(W / 2)`, `-(H / 2)`],
			[`-(W / 2)`, `-(H / 2)`],
		]),
		new Circle(['X', 'Y'], 'R'),
	],

	params: `
	<params>	
		<p name="R" desc="[мм] Радиус" default="30.0"></p>
		<p name="X" desc="[мм] Х центра окружности" default="0.0"></p>
		<p name="Y" desc="[мм] Y центра окружности" default="0.0"></p>
		
		<p name="H" desc="[мм] Высота" default="100.0"></p>
		<p name="W" desc="[мм] Ширина" default="100.0"></p>
				
		${new Condition('Окружность не должна пересекаться с прямоугольником', 'X + R < W / 2')}
		${new Condition('Окружность не должна пересекаться с прямоугольником', 'X - R > -(W / 2)')}
		${new Condition('Окружность не должна пересекаться с прямоугольником', 'Y + R < (H / 2)')}
		${new Condition('Окружность не должна пересекаться с прямоугольником', 'Y - R > -(H / 2)')}
		

	</params>
	`,
};

const getLengthFromPoints = (
	p0: [coordinate, coordinate],
	p1: [coordinate, coordinate],
): string => {
	const x0 = p0[0];
	const x1 = p1[0];

	const y0 = p1[1];
	const y1 = p1[1];

	const delta_x = `((${x0}) - (${x1}))`;
	const delta_y = `((${y0}) - (${y1}))`;

	return `SQRT((${delta_x} * ${delta_x}) + (${delta_y} * ${delta_y}))`;
};

const f_0_2_obj: { [a: string]: [coordinate, coordinate] } = {
	p0: [`X - (W / 2)`, `Y - (H / 2)`],
	p1: [`X - (W / 2)`, `Y + (H / 2)`],
	p2: [`X + (W / 2)`, `Y + (H / 2)`],
	p3: [`X + (W / 2) `, `Y - (H / 2)`],
};

const figure_0_2: IGenerate = {
	name: `_0_2 Прямоугольник в окружности`,
	primitives: [
		new Circle(['0', '0'], 'R'),
		new LinePath([f_0_2_obj.p0, f_0_2_obj.p1, f_0_2_obj.p2, f_0_2_obj.p3, f_0_2_obj.p0]),
	],

	params: `
	<params>	
		<p name="R" desc="[мм] Радиус" default="80.0"></p>
		<p name="X" desc="[мм] Х прямоугольника" default="0.0"></p>
		<p name="Y" desc="[мм] Y прямоугольника" default="0.0"></p>
		
		<p name="H" desc="[мм] Высота" default="100.0"></p>
		<p name="W" desc="[мм] Ширина" default="100.0"></p>
		
		
		${new Condition(
			'Окружность не должна пересекаться с прямоугольником',
			`((${f_0_2_obj.p0[0]}) * (${f_0_2_obj.p0[0]})) + ((${f_0_2_obj.p0[1]}) * (${f_0_2_obj.p0[1]})) < R * R`,
		)}
		${new Condition(
			'Окружность не должна пересекаться с прямоугольником',
			`((${f_0_2_obj.p1[0]}) * (${f_0_2_obj.p1[0]})) + ((${f_0_2_obj.p1[1]}) * (${f_0_2_obj.p1[1]})) < R * R`,
		)}
		${new Condition(
			'Окружность не должна пересекаться с прямоугольником',
			`((${f_0_2_obj.p2[0]}) * (${f_0_2_obj.p2[0]})) + ((${f_0_2_obj.p2[1]}) * (${f_0_2_obj.p2[1]})) < R * R`,
		)}
		${new Condition(
			'Окружность не должна пересекаться с прямоугольником',
			`((${f_0_2_obj.p3[0]}) * (${f_0_2_obj.p3[0]})) + ((${f_0_2_obj.p3[1]}) * (${f_0_2_obj.p3[1]})) < R * R`,
		)}
		
	</params>
	`,
};

const figure_23: IGenerate = {
	name: `_23 Блок`,
	primitives: [
		new Arc([0, 0], 'R1', 'M_PI / 2', '3 * M_PI / 2', false),
		new LineXML([0, '-(R1)'], ['L', '-(R2)']),
		new Arc(['L', 0], 'R2', 'M_PI / 2', '3 * M_PI / 2', true),
		new LineXML(['L', 'R2'], [0, 'R1']),
	],

	params: `
	<params>	
		<p name="R1" desc="[мм] Левый радиус" default="70.0"></p>
		<p name="R2" desc="[мм] Правый радиус" default="50.0"></p>
		<p name="L" desc="[мм] Длина между центрами окружностей" default="100.0"></p>
	</params>
	`,
};

const figure_26: IGenerate = {
	name: `_26 Ушко`,
	primitives: [
		new LinePath([
			[0, 0],
			[0, 'H - Y1'],
			['X1', 'H'],
			['L - X2', 'H'],
			['L', 'H - Y2'],
			['L', 0],
		]),

		new Arc(
			['L/2', '-SQRT((R * R) - (L * L / 4))'],
			'R',
			'(M_PI / 2) - ASIN(L / (2 * R))',
			'(M_PI / 2) + ASIN(L / (2 * R))',
			false,
		),
	],

	params: `
	<params>	
		<p name="X1" desc="[мм] Левый срез по Х" default="20.0"></p>
		<p name="Y1" desc="[мм] Высота левого среза" default="20.0"></p>
		<p name="X2" desc="[мм] Правый срез по Х" default="20.0"></p>
		<p name="Y2" desc="[мм] Высота правого среза" default="20.0"></p>

		<p name="H" desc="[мм] Высота" default="100.0"></p>
		<p name="L" desc="[мм] Длина" default="150.0"></p>
		<p name="R" desc="[мм] Радиус" default="100.0"></p>

		

		${new Condition('Не верно задан радиус', '(R * R) > (L * L / 4)')}		
	</params>
	`,
};

const figure_14: IGenerate = {
	name: `_14 Раздел дуги`,
	primitives: [
		new Arc(
			[0, 0],
			'R1',
			'(M_PI / 2) - ((a / 2) * (M_PI / 180))',
			'(M_PI / 2) + ((a / 2) * (M_PI / 180))',
			false,
		),
		new LineXML(
			['R1 * COS(90 + (a / 2))', 'R1 * SIN(90 + (a / 2))'],
			['R2 * COS(90 + (a / 2))', 'R2 * SIN(90 + (a / 2))'],
		),
		new Arc(
			[0, 0],
			'R2',
			'(M_PI / 2) + ((a / 2) * (M_PI / 180))',
			'(M_PI / 2) - ((a / 2) * (M_PI / 180))',

			true,
		),
		new LineXML(
			['R2 * COS(90 - (a / 2))', 'R2 * SIN(90 - (a / 2))'],
			['R1 * COS(90 - (a / 2))', 'R1 * SIN(90 - (a / 2))'],
		),
	],
	params: `
	<params>
		

		<p name="R1" desc="[мм] Внутренний радиус" default="80.0"></p>
		<p name="R2" desc="[мм] Внешний радиус" default="100.0"></p>
		<p name="a" desc="[градусы] Разворот дуги" default="90.0"></p>

		${new Condition('Внутренний радиус должен быть меньше внешнего', `R1 < R2`)}

	</params>
	`,
};

const figure_29: IGenerate = {
	name: `_29 Трапецоид дуги`,
	primitives: [
		new Arc(
			[0, 0],
			'R',
			'(M_PI / 2) - ((a / 2) * (M_PI / 180))',
			'(M_PI / 2) + ((a / 2) * (M_PI / 180))',
			false,
		),
		new LinePath([
			['-(R * SIN(a/2))', '(R * COS(a/2))'],
			['-(R * SIN(a/2) + L * COS(a/2))', '(R * COS(a/2)) - (L * SIN(a/2))'],

			['(R * SIN(a/2)) + (L * COS(a/2))', '(R * COS(a/2)) - (L * SIN(a/2))'],
			['R * SIN(a/2)', 'R * COS(a/2)'],
		]),
	],
	params: `
	<params>
		<p name="R" desc="[мм] Радиус" default="60.0"></p>
		<p name="L" desc="[мм] Длина боковой стороны" default="200.0"></p>
		<p name="a" desc="[градусы] Разворот дуги" default="120.0"></p>
	</params>
	`,
};

const figure_30: IGenerate = {
	name: `_30 Трапецоид дуги с отверстием`,
	primitives: [
		new Arc(
			[0, 0],
			'R',
			'(M_PI / 2) - ((a / 2) * (M_PI / 180))',
			'(M_PI / 2) + ((a / 2) * (M_PI / 180))',
			false,
		),
		new LinePath([
			['-(R * SIN(a/2))', '(R * COS(a/2))'],
			['-(R * SIN(a/2) + L * COS(a/2))', '(R * COS(a/2)) - (L * SIN(a/2))'],

			['(R * SIN(a/2)) + (L * COS(a/2))', '(R * COS(a/2)) - (L * SIN(a/2))'],
			['R * SIN(a/2)', 'R * COS(a/2)'],
		]),

		new Circle([0, 0], 'R1'),
	],
	params: `
	<params>
		<p name="R" desc="[мм] Радиус" default="70.0"></p>
		<p name="R1" desc="[мм] Внутренний радиус" default="50.0"></p>
		<p name="L" desc="[мм] Длина боковой стороны" default="200.0"></p>
		<p name="a" desc="[градусы] Разворот дуги" default="120.0"></p>

		${new Condition('Внутренний радиус должен быть меньше внешнего', `R1 < R`)}
	</params>
	`,
};

const figure_35: IGenerate = {
	name: `_35 Прямоугольник с проемами`,
	primitives: [
		new LineXML(['(W/2) - R1', 0], ['-(W/2) - R1', 0]),
		new Arc(['-(W/2) - R1', 'R1'], 'R1', '3 * M_PI / 2', 'M_PI', true),
		new Circle(['-(W/2) - R1', 'R1'], 'R2'),

		new LineXML(['-(W/2)', 'R1'], ['-(W/2)', 'H - R1']),
		new Arc(['-(W/2) - R1', 'H - R1'], 'R1', 'M_PI ', 'M_PI / 2', true),
		new Circle(['-(W/2) - R1', 'H - R1'], 'R2'),

		new LineXML(['-((W/2) - R1)', 'H'], ['((W/2) - R1)', 'H']),
		new Arc(['((W/2) - R1)', 'H - R1'], 'R1', 'M_PI / 2 ', '0 * M_PI', true),
		new Circle(['((W/2) - R1)', 'H - R1'], 'R2'),

		new LineXML(['W/2', 'H - R1'], ['W/2', 'R1']),
		new Arc(['((W/2) - R1)', 'R1'], 'R1', '0', '3 * M_PI / 2', true),
		new Circle(['((W/2) - R1)', 'R1'], 'R2'),

		new Circle(['0', 'R1'], 'R2'),
		new Circle(['0', 'H - R1'], 'R2'),
		// new Circle(['((W/2) - R1)', 'R1'], 'R2'),
	],
	params: `
	<params>

		<p name="R1" desc="[мм] Радиус скругления детали" default="25.0"></p>
		<p name="R2" desc="[мм] Радиус отверстия" default="10.0"></p>
		
		<p name="W" desc="[мм] Длина " default="500.0"></p>
		<p name="H" desc="[мм] Высота " default="200.0"></p>
		
		
	</params>
	`,
};

const f = {
	x: `(W2 + W3 - W1)`,
	y: `(H1 + H2)`,

	x_2: `((W2 + W3 - W1) * (W2 + W3 - W1))`,
	x_3: `((W2 + W3 - W1) * (W2 + W3 - W1) * (W2 + W3 - W1))`,
	x_4: `((W2 + W3 - W1) * (W2 + W3 - W1) * (W2 + W3 - W1) * (W2 + W3 - W1))`,

	y_2: `((H1 + H2) * (H1 + H2))`,
	y_3: `((H1 + H2) * (H1 + H2) * (H1 + H2))`,
	y_4: `((H1 + H2) * (H1 + H2) * (H1 + H2) * (H1 + H2))`,
};

const A = `(${f.x_2} + ${f.y_2})`;

const f_sqrt = `( SQRT( -(${f.y_2}) * ${A} * ((-(4 * R * R)) + ${A})) )`;
// const f_sqrt = `( SQRT( (-${40000}) * ${42500} * ( (-(4 * ${62500}) ) + ${42500})) )`;

const calcBracket = (str: string): void => {
	let openBracket = 0;
	let closeBracket = 0;

	for (const ch of str) {
		if (ch === '(') {
			openBracket++;
		}
		if (ch === ')') {
			closeBracket++;
		}
	}

	console.log(`(:${openBracket} ): ${closeBracket}`);
};

calcBracket(`( SQRT( -(${f.y_2}) * ${A} * (-(4 * R * R) + ${A})) )`);
calcBracket(`  (${f_sqrt} + (${f.x} * ${A})) / (2 * ${A})`);
calcBracket(`(-((${f.x} * ${f_sqrt} + (${f.y_2} * ${A})) / (2 * ${f.y} * ${A})))`);

const figure_36: IGenerate = {
	name: `_36 Верхнее угловое соединение опоры`,
	primitives: [
		new LineXML([0, 0], ['-(W1 - R1)', 0]),
		// new Arc(['-(W1 - R1)', 'R1'], 'R1', '3 * M_PI / 2', 'M_PI', true),

		new LinePath([
			['-(W1)', 'R1'],
			['-(W1)', 'H1'],
			['-(W1 - W2)', 'H1'],
			['-(W1 - W2)', 'H1 + H2'],
			[`${f.x}`, `${f.y}`],
		]),

		new Circle(
			[
				`  (${f_sqrt} + (${f.x} * ${A})) / (2 * ${A})`,
				`(((((-(${f.x})) * ${f_sqrt} + (${f.y_2} * ${A}))) / (2 * ${f.y} * ${A})))`,
			],
			`R`,
		),

		new Circle([0, 0], `R`),
		new Circle([f.x, f.y], `R`),

		// new Arc([0, 0], 'SQRT(25 + 16)', 'ATAN2(4, -5)', `ATAN2(2, -4)`, false),
		// // new Arc([0, 0], 'SQRT(25 + 16)', '0', `M_PI/4`, true),
		// new LineXML([0, 0], [-5, 4]),
		// new LineXML([0, 0], [-4, 2]),
	],
	params: `
	<params>

		<p name="W1" desc="[мм] Длина основания" default="200.0"></p>
		<p name="W2" desc="[мм] Средняя длина " default="100.0"></p>
		<p name="W3" desc="[мм] Верхняя длина " default="150.0"></p>

		<p name="H1" desc="[мм] Высота первой ступени " default="100.0"></p>
		<p name="H2" desc="[мм] Высота второй ступени " default="100.0"></p>

		<p name="R1" desc="[мм] Радиус скругления детали" default="25.0"></p>
		<p name="R" desc="[мм] Радиус правой стороны" default="250.0"></p>
		
		
		${new Condition('Сумма средней и верхней длины должна быть больше длины основания', `W2 + W3 > W1`)}
	</params>
	`,
};

// generate(figure_11);
// generate(figure_12);
// generate(figure_13);
// generate(figure_14);
// generate(figure_15); // Угловое соединени

// generate(figure_16);

// 09.02
// generate(figure_17);
// generate(figure_18_1);
// generate(figure_18_2);
// generate(figure_19_1);
// generate(figure_19_2);

// 10.02
// generate(figure_20);
// generate(figure_21);
// generate(figure_21_1);
// generate(figure_21_2);
// generate(figure_22);

// 13.02
// generate(figure_0_1);
// generate(figure_0_2);
// generate(figure_24);
// generate(figure_23);
// generate(figure_26);
// generate(figure_14);

// 14.02
// generate(figure_29);
// generate(figure_30);
// generate(figure_35);

// 15.02
generate(figure_36);
