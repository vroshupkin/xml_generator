import { generate, IGenerate } from '../generator';
import { IDetail } from './generator.interface';
import {
	LineXML,
	Arc,
	Circle,
	LinePath,
	Rotate,
	Arc_3points,
	Arc_2points_and_radius,
} from './figures';
import { coordinate } from './figure.interface';
import { checkBracker } from './common/parser';
import { Condition, GenerateVariable } from './condition';

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

const figure_19_2__20: IGenerate = {
	name: `Общий треугольник по двум соторонам и углу между ними`,
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

const figure_20__25: IGenerate = {
	name: `Правильный многоульник`,
	primitives: [new Rotate([figure_20_elments], 0, '360 / n', 'n')],

	params: `
	<params>
		
		<p name="l" desc="[мм] Длина стороны" default="50.0"></p>
		<p name="n" desc="[кол-во] Количество сторон прямоугольника" default="6.0"></p>
		

		
	</params>


	`,
};

const figure_21__26: IGenerate = {
	name: `U скоба`,
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

const figure_21_1__27: IGenerate = {
	name: `Правильный многоульник в окружности`,
	primitives: [new Rotate([figure_21_1_elments], 0, '360 / n', 'n'), new Circle([0, 0], 'l')],

	params: `
	<params>
		
		<p name="l" desc="[мм] Радиус" default="50.0"></p>
		<p name="n" desc="[кол-во] Количество сторон прямоугольника" default="4.0"></p>
		

		
	</params>


	`,
};

const figure_21_2__28: IGenerate = {
	name: `Окружность в правильном многоугольнике`,
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

const figure_22__29: IGenerate = {
	name: `Четырехугольник`,
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

const figure_24__23: IGenerate = {
	name: `Лопасть`,
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

const figure_0_1__21: IGenerate = {
	name: `Окружность в прямоугольнике`,
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

const figure_0_2__22: IGenerate = {
	name: `Прямоугольник в окружности`,
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

const figure_23__24: IGenerate = {
	name: `Блок`,
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

const figure_26__30: IGenerate = {
	name: `Ушко`,
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

const figure_29__31: IGenerate = {
	name: `Трапецоид дуги`,
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

const figure_30__32: IGenerate = {
	name: `Трапецоид дуги с окружностью`,
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

const figure_35__33: IGenerate = {
	name: `Прямоугольник с проемами`,
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

checkBracker(`( SQRT( -(${f.y_2}) * ${A} * (-(4 * R * R) + ${A}) ))`);
checkBracker(`  (${f_sqrt} + (${f.x} * ${A})) / (2 * ${A})`);
checkBracker(`(-((${f.x} * ${f_sqrt} + (${f.y_2} * ${A})) / (2 * ${f.y} * ${A})))`);

const x0 = `(${f.x})`;
const y0 = `(${f.y})`;

const x1 = `(0)`;
const y1 = `(0)`;

const X = `(${x1} - ${x0})`;
const Y = `(${y1} - ${y0})`;

const z_L = `( R - SQRT((R * R) - ((${X} * ${X} + ${Y} * ${Y})) / 4 ) )`;
checkBracker(z_L);

const alpha_rad = `( ATAN2(${Y}, ${X}) )`;
const alpha_deg = `( 180 * ATAN2(${Y}, ${X}) / (M_PI) )`;
checkBracker(alpha_rad);
checkBracker(alpha_deg);

const vec_0 = [`( 0 )`, `( R - SQRT(R * R - (${X} * ${X} + ${Y} * ${Y} / 4)) )`];
const vec_1 = [`( -( SIN(${alpha_deg}) * ${z_L}) )`, `( COS(${alpha_deg}) * ${z_L} )`];
const vec_2 = [`( (${x1} + ${x0}) / 2) + ${vec_1[0]}`, `( (${y1} + ${y0}) / 2) + ${vec_1[1]}`];

checkBracker(vec_0[0]);
checkBracker(vec_0[1]);
checkBracker(vec_1[0]);
checkBracker(vec_1[1]);
checkBracker(vec_2[0]);
checkBracker(vec_2[1]);

// const v1 = [
// 	`${x0} + (${z_L} / 2) + COS(180 + ${alpha} * (180 / M_PI)) * ${z_L}`,
// 	`${y0} + SIN(180 + ${alpha} * (180 / M_PI)) * ${z_L} `,
// ];

const figure_36__34: IGenerate = {
	name: `Верхнее угловое соединение опоры`,
	primitives: [
		new LineXML([0, 0], ['-(W1 - R1)', 0]),
		new Arc(['-(W1 - R1)', 'R1'], 'R1', '3 * M_PI / 2', 'M_PI', true),

		new LinePath([
			['-(W1)', 'R1'],
			['-(W1)', 'H1'],
			['-(W1 - W2)', 'H1'],
			['-(W1 - W2)', 'H1 + H2'],
			[`${f.x}`, `${f.y}`],
		]),

		new Arc_2points_and_radius([x0, y0], [x1, y1], 'R', 'right'),
	],
	params: `
	<params>

		<p name="W1" desc="[мм] Длина основания" default="200.0"></p>
		<p name="W2" desc="[мм] Средняя длина " default="100.0"></p>
		<p name="W3" desc="[мм] Верхняя длина " default="150.0"></p>

		<p name="H1" desc="[мм] Высота первой ступени " default="100.0"></p>
		<p name="H2" desc="[мм] Высота второй ступени " default="100.0"></p>

		<p name="R1" desc="[мм] Радиус скругления детали. Левый нижний угол" default="25.0"></p>
		<p name="R" desc="[мм] Радиус правой стороны" default="300.0"></p>
		
		${new Arc_2points_and_radius([x0, y0], [x1, y1], 'R', 'right').generateParam(
			'Радиус правой стороны должен быть больше',
		)}

		${new Condition('Сумма двух верхних длин должна быть больше длины основания', `W2 + W3 > W1`)}
	</params>
	`,
};

const figure_36_left__35: IGenerate = {
	name: `Угловое соединение c выгнутой стороной`,
	primitives: [
		new LineXML([0, 0], ['-(W1 - R1)', 0]),
		new Arc(['-(W1 - R1)', 'R1'], 'R1', '3 * M_PI / 2', 'M_PI', true),

		new LinePath([
			['-(W1)', 'R1'],
			['-(W1)', 'H1'],
			['-(W1 - W2)', 'H1'],
			['-(W1 - W2)', 'H1 + H2'],
			[`${f.x}`, `${f.y}`],
		]),

		new Arc_2points_and_radius([x0, y0], [x1, y1], 'R', 'left'),
	],
	params: `
	<params>

		<p name="W1" desc="[мм] Длина основания" default="200.0"></p>
		<p name="W2" desc="[мм] Средняя длина " default="100.0"></p>
		<p name="W3" desc="[мм] Верхняя длина " default="150.0"></p>

		<p name="H1" desc="[мм] Высота первой ступени " default="100.0"></p>
		<p name="H2" desc="[мм] Высота второй ступени " default="100.0"></p>

		<p name="R1" desc="[мм] Радиус скругления детали. Левый нижний угол" default="25.0"></p>
		<p name="R" desc="[мм] Радиус правой стороны" default="300.0"></p>
		
		${new Arc_2points_and_radius([x0, y0], [x1, y1], 'R', 'left').generateParam(
			'Радиус правой стороны должен быть больше',
		)}

		${new Condition('Сумма двух верхних длин должна быть больше длины основания', `W2 + W3 > W1`)}
	</params>
	`,
};

const figure_37__36: IGenerate = {
	name: `Нижнее угловое соединение опоры`,
	primitives: [
		new LineXML([0, 0], ['-(W1 - R1)', 0]),
		new Arc(['-(W1 - R1)', 'R1'], 'R1', '3 * M_PI / 2', 'M_PI', true),

		new LinePath([
			['-(W1)', 'R1'],
			['-(W1)', 'H1'],
			['-(W1 - W2)', 'H1'],
			['-(W1 - W2)', 'H1 + H2'],
			[`${f.x}`, `${f.y}`],
		]),

		new Arc_2points_and_radius([x0, y0], [x1, y1], 'R', 'right'),
	],
	params: `
	<params>

		<p name="W1" desc="[мм] Длина основания" default="300.0"></p>
		<p name="W2" desc="[мм] Средняя длина " default="100.0"></p>
		<p name="W3" desc="[мм] Верхняя длина " default="150.0"></p>

		<p name="H1" desc="[мм] Высота первой ступени " default="100.0"></p>
		<p name="H2" desc="[мм] Высота второй ступени " default="100.0"></p>

		<p name="R1" desc="[мм] Радиус скругления детали. Левый нижний угол" default="25.0"></p>
		<p name="R" desc="[мм] Радиус правой стороны" default="150.0"></p>
		
		${new Arc_2points_and_radius([x0, y0], [x1, y1], 'R', 'right').generateParam(
			'Радиус правой стороны должен быть больше',
		)}

		${new Condition(' Длина основания должна быть больше суммы двух верхних длин', `W2 + W3 < W1`)}
	</params>
	`,
};

const figure_37_left__37: IGenerate = {
	name: `Нижнее угловое соединение опоры c выгнутой стороной`,
	primitives: [
		new LineXML([0, 0], ['-(W1 - R1)', 0]),
		new Arc(['-(W1 - R1)', 'R1'], 'R1', '3 * M_PI / 2', 'M_PI', true),

		new LinePath([
			['-(W1)', 'R1'],
			['-(W1)', 'H1'],
			['-(W1 - W2)', 'H1'],
			['-(W1 - W2)', 'H1 + H2'],
			[`${f.x}`, `${f.y}`],
		]),

		new Arc_2points_and_radius([x0, y0], [x1, y1], 'R', 'left'),
	],
	params: `
	<params>

		<p name="W1" desc="[мм] Длина основания" default="300.0"></p>
		<p name="W2" desc="[мм] Средняя длина " default="100.0"></p>
		<p name="W3" desc="[мм] Верхняя длина " default="150.0"></p>

		<p name="H1" desc="[мм] Высота первой ступени " default="100.0"></p>
		<p name="H2" desc="[мм] Высота второй ступени " default="100.0"></p>

		<p name="R1" desc="[мм] Радиус скругления детали. Левый нижний угол" default="25.0"></p>
		<p name="R" desc="[мм] Радиус правой стороны" default="300.0"></p>
		
		${new Arc_2points_and_radius([x0, y0], [x1, y1], 'R', 'left').generateParam(
			'Радиус правой стороны должен быть больше',
		)}

		${new Condition(' Длина основания должна быть больше суммы двух верхних длин', `W2 + W3 < W1`)}
	</params>
	`,
};

const figure_38__38: IGenerate = {
	name: `Круглый лист отсчёта`,
	primitives: [
		new Arc([0, 0], 'R', '0', 'M_PI', false),

		new Arc_2points_and_radius(['(-(R))', '0'], ['(-(R + L))', 'H'], 'R1', 'left'),
		new Arc_2points_and_radius(['-(R + L)', 'H'], ['(R + L)', 'H'], 'R2', 'right'),
		new Arc_2points_and_radius(['(R + L)', 'H'], ['(R)', '0'], 'R1', 'left'),
	],
	params: `
	<params>

		<p name="R" desc="[мм] Радиус окружности в центра" default="70.0"></p>
		<p name="L" desc="[мм] Отступ от окружности по боками" default="100.0"></p>
		<p name="H" desc="[мм] Высота детали" default="200.0"></p>
		<p name="R1" desc="[мм] Радиус скруглений боковых сторон" default="200.0"></p>
		<p name="R2" desc="[мм] Верхний радиус скругления" default="315.0"></p>

		${new Arc_2points_and_radius(['(R + L)', 'H'], ['0', '0'], 'R1', 'left').generateParam(
			'Боковые радиусы скругление должны быть больше',
		)}
 		${new Arc_2points_and_radius(['-(R + L)', 'H'], ['(R + L)', 'H'], 'R2', 'right').generateParam(
			'Верхний радиус скругление должен быть больше',
		)}
		
		
	</params>
	`,
};

const figure_39__39: IGenerate = {
	name: `Лист поддержки глушителя`,
	primitives: [
		new LinePath([
			[0, 0],
			['(-( W - dL))', 0],
		]),

		new Arc_2points_and_radius(['(-( W - dL))', 0], ['(-W)', 'H'], 'R1', 'right'),

		new LinePath([
			['(-W)', 'H'],
			['0', 'H'],
		]),

		new Arc([0, 'H - R'], 'R', 'M_PI / 2', '0', true),
		new LinePath([
			['R', 'H - R'],
			['R', 'R'],
		]),
		new Arc([0, 'R'], 'R', '0', '3 * M_PI / 2', true),

		new Circle(['-(X)', 'Y1'], 'R2'),
		new Circle(['-(X)', 'Y2'], 'R2'),
	],
	params: `
	<params>
		<p name="R" desc="[мм] Радиус скругления краев справа" default="25.0"></p>
		<p name="R1" desc="[мм] Радиус скругления слева" default="300.0"></p>
		<p name="H" desc="[мм] Высота детали" default="250.0"></p>
		<p name="W" desc="[мм] Ширина детали" default="250.0"></p>
		<p name="dL" desc="[мм] Отступ слева" default="100.0"></p>

		<p name="R2" desc="[мм] Радиус внутренних отверстий" default="10.0"></p>
		<p name="X" desc="[мм] Сдвиг отверстий по X" default="25.0"></p>
		<p name="Y1" desc="[мм] Сдвиг верхнего отверстия по Y" default="215.0"></p>
		<p name="Y2" desc="[мм] Сдвиг нижнего отверстия по Y" default="40.0"></p>
		
		

		${new Arc_2points_and_radius(['(-( W - dL))', 0], ['(-W)', 'H'], 'R1', 'right').generateParam(
			'Радиус скругления слева должен быть больше',
		)}
		
	</params>
	`,
};

const figure_40: IGenerate = {
	name: `Прямоугольный лист отсчёта`,
	primitives: [
		new LinePath([
			[0, 0],
			['-(L1 - R)', 0],
		]),

		new Arc(['(-(L1))', 0], 'R', '0', 'M_PI', false),

		new LinePath([
			['-(L1 + R)', 0],
			['-((W/2) - dX)', 0],
			['-(W/2)', 'dY'],
			['-(W/2)', 'H'],
		]),

		new Arc_2points_and_radius(['-(W/2)', 'H'], ['(W/2)', 'H'], 'R1', 'right'),

		new LinePath([
			['(W/2)', 'H'],
			['(W/2)', 'dY'],
			['((W/2) - dX)', 0],
			['(L1 + R)', 0],
		]),

		new Arc(['L1', 0], 'R', '0', 'M_PI', false),

		new LinePath([
			['L1 - R', 0],
			[0, 0],
		]),
	],
	params: `
	<params>
		<p name="R" desc="[мм] Радиусы вырезов снизу" default="44.0"></p>
		<p name="R1" desc="[мм] Радиус скругления сверху" default="500.0"></p>

		<p name="H" desc="[мм] Высота детали" default="250.0"></p>
		<p name="W" desc="[мм] Ширина детали" default="500.0"></p>

		<p name="L1" desc="[мм] Сдвиг окржностей от центра" default="74.0"></p>

		<p name="dX" desc="[мм] Длина среза угла" default="40.0"></p>
		<p name="dY" desc="[мм] Высота среза угла" default="40.0"></p>
		
		
		${new GenerateVariable('dY', '[мм] Высота среза угла', 40)}

		${new Arc_2points_and_radius(['-(W/2)', 'H'], ['(W/2)', 'H'], 'R1', 'right').generateParam(
			'Радиус скругления сверху должен быть больше',
		)}
		${new Condition('Сдвиг окружностей от центра должен быть больше или равен радиусу', 'L1 >= R')}
	</params>
	`,
};

const figure_41: IGenerate = {
	name: `Боковой сталкивающий лист`,
	primitives: [
		new Arc_2points_and_radius([0, 0], ['-(W)', 0], 'R1', 'right'),
		new LinePath([
			['-(W)', 0],
			['-(W)', `(H1 - R)`],
		]),

		new Arc(['-(W)', 'H1'], 'R', '3 * M_PI / 2', 'M_PI/2', false),
		new LinePath([
			['-(W)', 'H1 + R'],
			['-(W)', 'H'],
			[0, 'H'],
			[0, 'H1 + R'],
		]),

		new Arc(['0', 'H1'], 'R', 'M_PI/2', '3 * M_PI / 2', false),

		new LinePath([
			[0, 'H1 - R'],
			[0, 0],
		]),
	],
	params: `
	<params>

		<p name="H" desc="[мм] Высота детали" default="500.0"></p>
		<p name="W" desc="[мм] Ширина детали" default="500.0"></p>


		<p name="R" desc="[мм] Радиус боковых вырезов" default="70.0"></p>
		<p name="H1" desc="[мм] Высота вырезов" default="320.0"></p>

		<p name="R1" desc="[мм] Радиус нижнего скругления" default="500.0"></p>

		${new Condition('Высота вырезов должна быть меньше высоты без радиуса', 'H1 < H + R')}
		${new Condition('Высота вырезов должна быть больше радиуса', 'H1 > R')}
		${new Condition('Ширина детали должна быть больше суммы 2ух радиусов выреза', 'W > R + R')}
		
	</params>
	`,
};

const figure_42: IGenerate = {
	name: `Окружность с проемами`,
	primitives: [
		new Rotate(
			[
				new Arc([0, 0], 'R', 'M_PI/2 + (M_PI / N)', 'M_PI/2 + ASIN(W0 / (2 * R))', true),
				new LinePath([
					['-(W0 / 2)', 'R * SIN( (M_PI/2 + ASIN(W0 / (2 * R))) * (180 / M_PI) )'],
					['-(W0 / 2)', '(R - H0)'],
				]),

				new LinePath([
					['-(W0 / 2)', '(R - H0)'],
					['-((dW) / 2)', 'R - H0'],
				]),

				new Arc(['-((dW) / 2)', 'R - (H0 + R0)'], 'R0', 'M_PI/2', '3 * M_PI / 2', false),

				new LinePath([
					['-((dW) / 2)', 'R - (H0 + 2 * R0)'],
					['((dW) / 2)', 'R - (H0 + 2 * R0)'],
				]),

				new Arc(['((dW) / 2)', 'R - (H0 + R0)'], 'R0', '3 * M_PI / 2', 'M_PI/2', false),

				new LinePath([
					['((dW) / 2)', 'R - (H0)'],
					['W0 / 2', 'R - (H0)'],
				]),

				new LinePath([
					['(W0 / 2)', '(R - H0)'],
					['(W0 / 2)', 'R * SIN( (M_PI/2 + ASIN(W0 / (2 * R))) * (180 / M_PI) )'],
				]),
				new Arc([0, 0], 'R', 'M_PI/2 - ASIN(W0 / (2 * R) )', 'M_PI/2 - (M_PI / N)', true),
			],
			'0',
			'(2 * M_PI / N) * (180 / M_PI)',
			'N',
		),
	],
	params: `
	<params>

		<p name="H0" desc="[мм] Глубина выреза" default="50.0"></p>
		<p name="W0" desc="[мм] Ширина вреза" default="15.0"></p>
		<p name="R" desc="[мм] Радиус шестерни" default="250.0"></p>
		
		<p name="dW" desc="[мм] Расстояние между половинами окружностей" default="50.0"></p>
		<p name="R0" desc="[мм] Радиус окружностей" default="35.0"></p>
		
		<p name="N" desc="[шт] Количество вырезов" default="6.0"></p>

		${new Condition(
			'Расстояние между половинами окружностей должно быть больше ширины вырезов',
			'dW > W0',
		)}
	</params>
	`,
};

const figure_43: IGenerate = {
	name: `Кольцеобразная кромка с проемами`,
	primitives: [
		new Rotate(
			[
				new Arc([0, 0], 'R', 'M_PI/2 + (M_PI / N)', 'M_PI/2 + ASIN(W0 / (2 * R))', true),
				new LinePath([
					['-(W0 / 2)', 'R * SIN( (M_PI/2 + ASIN(W0 / (2 * R))) * (180 / M_PI) )'],
					['-(W0 / 2)', '(R - H0)'],
				]),

				new LinePath([
					['-(W0 / 2)', '(R - H0)'],
					['-((dW) / 2)', 'R - H0'],
				]),

				new Arc(['-((dW) / 2)', 'R - (H0 + R0)'], 'R0', 'M_PI/2', '3 * M_PI / 2', false),

				new LinePath([
					['-((dW) / 2)', 'R - (H0 + 2 * R0)'],
					['((dW) / 2)', 'R - (H0 + 2 * R0)'],
				]),

				new Arc(['((dW) / 2)', 'R - (H0 + R0)'], 'R0', '3 * M_PI / 2', 'M_PI/2', false),

				new LinePath([
					['((dW) / 2)', 'R - (H0)'],
					['W0 / 2', 'R - (H0)'],
				]),

				new LinePath([
					['(W0 / 2)', '(R - H0)'],
					['(W0 / 2)', 'R * SIN( (M_PI/2 + ASIN(W0 / (2 * R))) * (180 / M_PI) )'],
				]),
				new Arc([0, 0], 'R', 'M_PI/2 - ASIN(W0 / (2 * R) )', 'M_PI/2 - (M_PI / N)', true),
			],
			'0',
			'(2 * M_PI / N) * (180 / M_PI)',
			'N',
		),
		new Circle([0, 0], 'R1'),
	],
	params: `
	<params>

		<p name="H0" desc="[мм] Глубина выреза" default="50.0"></p>
		<p name="W0" desc="[мм] Ширина выреза" default="15.0"></p>
		<p name="R" desc="[мм] Радиус шестерни" default="300.0"></p>
		
		<p name="dW" desc="[мм] Расстояние между половинами окружностей" default="50.0"></p>
		<p name="R0" desc="[мм] Радиус внутренних окружностей" default="35.0"></p>
		
		<p name="N" desc="[шт] Количество вырезов" default="6.0"></p>
		<p name="R1" desc="[мм] Радиус центральной окружности" default="100"></p>

		${new Condition(
			'Расстояние между половинами окружностей должно быть больше ширины вреза',
			'dW > W0',
		)}

		${new Condition('Радиус центральной окружности должен вмешаться', 'R1 < H0 + 2 * R0')}
	</params>
	`,
};

const figure_44: IGenerate = {
	name: `Кольцеобразная кромка с замочными скважинами`,
	primitives: [
		new Rotate(
			[
				new Arc([0, 0], 'R', 'M_PI/2 + (M_PI / N)', 'M_PI/2 + ASIN(W0 / (2 * R))', true),
				new LinePath([
					['-(W0 / 2)', 'R * SIN( (M_PI/2 + ASIN(W0 / (2 * R))) * (180 / M_PI) )'],
					['-(W0 / 2)', '(R - H0)'],
				]),

				new Arc(
					[0, 'R - (H0 + R0) - (R0 - SQRT(R0 * R0 - (W0 * W0 / 4) ))'],
					'R0',
					'M_PI / 2 + ASIN(W0 / (2 * R0))',
					'M_PI / 2 - ASIN(W0 / (2 * R0))',
					false,
				),
				new LinePath([
					['(W0 / 2)', '(R - H0)'],
					['(W0 / 2)', 'R * SIN( (M_PI/2 + ASIN(W0 / (2 * R))) * (180 / M_PI) )'],
				]),
				new Arc([0, 0], 'R', 'M_PI/2 - ASIN(W0 / (2 * R) )', 'M_PI/2 - (M_PI / N)', true),
			],
			'0',
			'(2 * M_PI / N) * (180 / M_PI)',
			'N',
		),
		new Circle([0, 0], 'R1'),
	],
	params: `
	<params>

		<p name="H0" desc="[мм] Глубина выреза" default="50.0"></p>
		<p name="W0" desc="[мм] Ширина выреза" default="15.0"></p>
		<p name="R" desc="[мм] Радиус всей шестерни" default="300.0"></p>

		<p name="R0" desc="[мм] Радиус внутренних окружностей" default="50.0"></p>		
		<p name="N" desc="[шт] Количество вырезов" default="6.0"></p>
	</params>
	`,
};

const figure_45: IGenerate = {
	name: `Кольцеобразная кромка`,
	primitives: [
		new Rotate(
			[
				new Arc([0, 0], 'R', 'M_PI/2 + (M_PI / N)', 'M_PI/2 + ASIN(W0 / (2 * R))', true),
				new LinePath([
					['-(W0 / 2)', 'R * SIN( (M_PI/2 + ASIN(W0 / (2 * R))) * (180 / M_PI) )'],
					['-(W0 / 2)', 'R + ((W0/2) - H0)'],
				]),

				new Arc([0, 'R + ((W0/2) - H0)'], 'W0 / 2', 'M_PI', '0', false),

				new LinePath([
					['(W0 / 2)', 'R + ((W0/2) - H0)'],
					['(W0 / 2)', 'R * SIN( (M_PI/2 + ASIN(W0 / (2 * R))) * (180 / M_PI) )'],
				]),
				new Arc([0, 0], 'R', 'M_PI/2 - ASIN(W0 / (2 * R) )', 'M_PI/2 - (M_PI / N)', true),
			],
			'0',
			'(2 * M_PI / N) * (180 / M_PI)',
			'N',
		),
	],
	params: `
	<params>

		<p name="H0" desc="[мм] Глубина выреза" default="110.0"></p>
		<p name="W0" desc="[мм] Ширина выреза" default="75.0"></p>
		<p name="R" desc="[мм] Радиус всей шестерни" default="300.0"></p>

		<p name="R0" desc="[мм] Радиус внутренних окружностей" default="50.0"></p>		
		<p name="N" desc="[шт] Количество вырезов" default="6.0"></p>

		${new Condition('Глубина выреза должна быть больше ширины выреза', 'H0 > W0')}
		
	</params>
	`,
};

const figure_46: IGenerate = {
	name: `Кольцеобразная кромка с окружностями`,
	primitives: [
		new Rotate(
			[
				new Arc([0, 0], 'R', 'M_PI/2 + (M_PI / N)', 'M_PI/2 + ASIN(W0 / (2 * R))', true),
				new LinePath([
					['-(W0 / 2)', 'R * SIN( (M_PI/2 + ASIN(W0 / (2 * R))) * (180 / M_PI) )'],
					['-(W0 / 2)', 'R + ((W0/2) - H0)'],
				]),

				new Arc([0, 'R + ((W0/2) - H0)'], 'W0 / 2', 'M_PI', '0', false),

				new LinePath([
					['(W0 / 2)', 'R + ((W0/2) - H0)'],
					['(W0 / 2)', 'R * SIN( (M_PI/2 + ASIN(W0 / (2 * R))) * (180 / M_PI) )'],
				]),
				new Arc([0, 0], 'R', 'M_PI/2 - ASIN(W0 / (2 * R) )', 'M_PI/2 - (M_PI / N)', true),
			],
			'0',
			'(2 * M_PI / N) * (180 / M_PI)',
			'N',
		),
		new Circle([0, 0], 'R1'),
	],
	params: `
	<params>

		<p name="H0" desc="[мм] Глубина выреза" default="110.0"></p>
		<p name="W0" desc="[мм] Ширина выреза" default="75.0"></p>
		<p name="R" desc="[мм] Радиус всей шестерни" default="300.0"></p>
		<p name="R1" desc="[мм] Радиус центральной окружности" default="100.0"></p>

		<p name="R0" desc="[мм] Радиус внутренних окружностей" default="50.0"></p>		
		<p name="N" desc="[шт] Количество вырезов" default="6.0"></p>

		${new Condition('Глубина выреза должна быть больше ширины выреза', 'H0 > W0')}
		
	</params>
	`,
};

const figure_47: IGenerate = {
	name: `Кольцеобразная кромка с замочными скважинами и центральной окружностью`,
	primitives: [
		new Rotate(
			[
				new Arc([0, 0], 'R', 'M_PI/2 + (M_PI / N)', 'M_PI/2 + ASIN(W0 / (2 * R))', true),
				new LinePath([
					['-(W0 / 2)', 'R * SIN( (M_PI/2 + ASIN(W0 / (2 * R))) * (180 / M_PI) )'],
					['-(W0 / 2)', '(R - H0)'],
				]),

				new Arc(
					[0, 'R - (H0 + R0) - (R0 - SQRT(R0 * R0 - (W0 * W0 / 4) ))'],
					'R0',
					'M_PI / 2 + ASIN(W0 / (2 * R0))',
					'M_PI / 2 - ASIN(W0 / (2 * R0))',
					false,
				),
				new LinePath([
					['(W0 / 2)', '(R - H0)'],
					['(W0 / 2)', 'R * SIN( (M_PI/2 + ASIN(W0 / (2 * R))) * (180 / M_PI) )'],
				]),
				new Arc([0, 0], 'R', 'M_PI/2 - ASIN(W0 / (2 * R) )', 'M_PI/2 - (M_PI / N)', true),
			],
			'0',
			'(2 * M_PI / N) * (180 / M_PI)',
			'N',
		),
		new Circle([0, 0], 'R1'),
	],
	params: `
	<params>

		<p name="H0" desc="[мм] Глубина выреза" default="50.0"></p>
		<p name="W0" desc="[мм] Ширина выреза" default="15.0"></p>
		<p name="R" desc="[мм] Радиус всей шестерни" default="300.0"></p>

		<p name="R0" desc="[мм] Радиус внутренних окружностей" default="50.0"></p>		
		<p name="N" desc="[шт] Количество вырезов" default="6.0"></p>

		<p name="R1" desc="[мм] Радиус центральной окружности" default="130.0"></p>		
	</params>
	`,
};

const figure_48: IGenerate = {
	name: `Ключ`,
	primitives: [
		new LinePath([
			['W / 2', 'SQRT(R * R - (W * W / 4))'],
			['W / 2', 'SQRT(R * R - (W * W / 4)) + H'],
			['-(W / 2)', 'SQRT(R * R - (W * W / 4)) + H'],
			['-(W / 2)', 'SQRT(R * R - (W * W / 4))'],
		]),

		new Arc(
			[0, 0],
			'R',
			'M_PI/2 + ASIN(W / (2 * R))',
			'3 * M_PI/2 - ASIN(W1 / (2 * R))',
			false,
		),

		new LinePath([
			['-(W1 / 2)', '(-(SQRT(R * R - (W1 * W1 / 4))))'],
			['-(W1 / 2)', '(-(SQRT(R * R - (W1 * W1 / 4)) - H1))'],
			['(W1 / 2)', '(-(SQRT(R * R - (W1 * W1 / 4)) - H1))'],
			['(W1 / 2)', '(-(SQRT(R * R - (W1 * W1 / 4))))'],
		]),

		new Arc(
			[0, 0],
			'R',
			'3 * M_PI/2 + ASIN(W1 / (2 * R))',
			'M_PI/2 - ASIN(W / (2 * R))',
			false,
		),
	],
	params: `
	<params>
		<p name="W" desc="[мм] Ширина хвата" default="100.0"></p>
		<p name="H" desc="[мм] Длина хвата" default="100.0"></p>
		<p name="R" desc="[мм] Радиус окружности головы" default="100.0"></p>


		<p name="W1" desc="[мм] Ширина проема" default="100.0"></p>
		<p name="H1" desc="[мм] Высота проема" default="100.0"></p>
	</params>
	`,
};

const figure_49: IGenerate = {
	name: `Лопасть с несколькими табуляторами`,
	primitives: [
		new LinePath([
			['W / 2', 'SQRT(R * R - (W * W / 4))'],
			['W / 2', 'SQRT(R * R - (W * W / 4)) + H'],
			['-(W / 2)', 'SQRT(R * R - (W * W / 4)) + H'],
			['-(W / 2)', 'SQRT(R * R - (W * W / 4))'],
		]),

		new Arc([0, 0], 'R', 'M_PI/2 + ASIN(W / (2 * R))', '3 * M_PI/2 - ASIN(W / (2 * R))', false),

		new LinePath([
			['-(W / 2)', '( -(SQRT(R * R - (W * W / 4))) )'],
			['-(W / 2)', '( -(SQRT(R * R - (W * W / 4))) + H)'],
			['(W / 2)', '( -(SQRT(R * R - (W * W / 4))) + H)'],
			['(W / 2)', '( -(SQRT(R * R - (W * W / 4))) )'],
		]),

		new Arc([0, 0], 'R', '3 * M_PI/2 + ASIN(W / (2 * R))', 'M_PI/2 - ASIN(W / (2 * R))', false),
	],
	params: `
	<params>
		<p name="W" desc="[мм] Ширина лопасти" default="100.0"></p>
		<p name="H" desc="[мм] Длина лопасти" default="100.0"></p>
		<p name="R" desc="[мм] Радиус" default="100.0"></p>

		${new Condition('Ширина должна быть меньше диаметра', 'W < 2 * R')}
	</params>
	`,
};

const figure_50: IGenerate = {
	name: `Лопасть с двумя табуляторами и окружностью`,
	primitives: [
		new LinePath([
			['W / 2', 'SQRT(R * R - (W * W / 4))'],
			['W / 2', 'SQRT(R * R - (W * W / 4)) + H'],
			['-(W / 2)', 'SQRT(R * R - (W * W / 4)) + H'],
			['-(W / 2)', 'SQRT(R * R - (W * W / 4))'],
		]),

		new Arc([0, 0], 'R', 'M_PI/2 + ASIN(W / (2 * R))', '3 * M_PI/2 - ASIN(W / (2 * R))', false),

		new LinePath([
			['-(W / 2)', '( -(SQRT(R * R - (W * W / 4))) )'],
			['-(W / 2)', '( -(SQRT(R * R - (W * W / 4))) + H)'],
			['(W / 2)', '( -(SQRT(R * R - (W * W / 4))) + H)'],
			['(W / 2)', '( -(SQRT(R * R - (W * W / 4))) )'],
		]),

		new Arc([0, 0], 'R', '3 * M_PI/2 + ASIN(W / (2 * R))', 'M_PI/2 - ASIN(W / (2 * R))', false),

		new Circle([0, 0], 'R0'),
	],
	params: `
	<params>
		<p name="W" desc="[мм] Ширина лопасти" default="100.0"></p>
		<p name="H" desc="[мм] Длина лопасти" default="100.0"></p>
		<p name="R" desc="[мм] Внешний радиус" default="100.0"></p>
		<p name="R0" desc="[мм] Внутренний радиус" default="50.0"></p>


		${new Condition('Внешний радиус должен быть больше внутреннего', 'R > R0')}
		${new Condition('Ширина должна быть меньше диаметра', 'W < 2 * R')}
	</params>
	`,
};

const asin = Math.asin;

console.log(asin(100 / (2 * 20)));

const figure_51: IGenerate = {
	name: `Прямоугольник с закругленой шириной радиусом`,
	primitives: [
		new Rotate(
			[
				new Arc_2points_and_radius(['-(W/2)', '(H/2)'], ['(W/2)', '(H/2)'], 'R', 'left'),
				new LinePath([
					['(W/2)', 'H/2'],
					['(W/2)', '-(H/2)'],
				]),
			],
			0,
			'180',
			2,
		),

		new Circle([0, 0], 'R1'),
	],
	params: `
	<params>
		<p name="W" desc="[мм] Ширина лопасти" default="200.0"></p>
		<p name="H" desc="[мм] Длина лопасти" default="200.0"></p>

		<p name="R" desc="[мм] Радиус закругления ширины" default="200.0"></p>
		<p name="R1" desc="[мм] Центральный радиус" default="50.0"></p>
		
	</params>
	`,
};

const figure_52: IGenerate = {
	name: `Прямоугольник с закругленой шириной`,
	primitives: [
		new Rotate(
			[
				new Arc_2points_and_radius(['-(W/2)', '(H/2)'], ['(W/2)', '(H/2)'], 'R', 'left'),
				new LinePath([
					['(W/2)', 'H/2'],
					['(W/2)', '-(H/2)'],
				]),
			],
			0,
			'180',
			2,
		),
	],
	params: `
	<params>
		<p name="W" desc="[мм] Ширина лопасти" default="200.0"></p>
		<p name="H" desc="[мм] Длина лопасти" default="200.0"></p>

		<p name="R" desc="[мм] Радиус закругления ширины" default="200.0"></p>
		<p name="R1" desc="[мм] Центральный радиус" default="50.0"></p>
		
	</params>
	`,
};

// ${new Condition('Ширина должна быть меньше половины радиуса', 'R < W / 2 ')}
// ${new Condition('Высота должна быть меньше половины радиуса', 'R < H / 2 ')}

const figures_xx_02 = [figure_11, figure_12, figure_13, figure_14, figure_15, figure_16];

// 09.02
const figures_09_02 = [figure_17, figure_18_1, figure_18_2, figure_19_1, figure_19_2__20];

// 10.02
const figures_10_02 = [
	figure_20__25,
	figure_21__26,
	figure_21_1__27,
	figure_21_2__28,
	figure_22__29,
];

// 13.02
const figures_13_02 = [
	figure_0_1__21,
	figure_0_2__22,
	figure_24__23,
	figure_23__24,
	figure_26__30,
	figure_14,
];

// 14.02
const figures_14_02 = [figure_29__31, figure_30__32, figure_35__33];

// 15.02
const figures_17_02 = [
	figure_36__34,
	figure_36_left__35,
	figure_37__36,
	figure_37_left__37,
	figure_38__38,
	figure_39__39,
	figure_40,
	figure_41,
];

const figures__20_29 = [
	figure_19_2__20,
	figure_0_1__21,
	figure_0_2__22,
	figure_24__23,
	figure_23__24,
	figure_20__25,
	figure_21__26,
	figure_21_1__27,
	figure_21_2__28,
	figure_22__29,
];

// for (const figure of figures__21_29) {
// 	generate(figure);
// }

const figures__30_39 = [
	figure_26__30,
	figure_29__31,
	figure_30__32,
	figure_35__33,

	figure_36__34,
	figure_36_left__35,
	figure_37__36,
	figure_37_left__37,
	figure_38__38,
	figure_39__39,
];

for (const figure of figures__30_39) {
	generate(figure);
}

// // 30 - 39;
// generate(figure_26__30);
// generate(figure_29__31);
// generate(figure_30__32);
// generate(figure_35__33);
// // 17.02
// generate(figure_36__34);
// generate(figure_36_left__35);
// generate(figure_37__36);
// generate(figure_37_left__37);
// generate(figure_38__38);
// generate(figure_39__39);

// generate(figure_40);
// generate(figure_41);

// // 19.02
// generate(figure_42);
// generate(figure_43);

// // 20.02
// generate(figure_44);
// generate(figure_45);
// generate(figure_46);
// generate(figure_47);
// generate(figure_48);
// generate(figure_49);
// generate(figure_50);

// 21.02
// generate(figure_51);
// generate(figure_52);

console.log(
	8 +
		figures_xx_02.length +
		figures_09_02.length +
		figures_10_02.length +
		figures_13_02.length +
		figures_14_02.length +
		figures_17_02.length,
);
