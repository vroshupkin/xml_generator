import { generate_80_89 } from '../src/templates/80-89';

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
import { clearDirTemplate, cpToTemplate_1_9 } from './common/terminal';
import { generate_10_19 } from './templates/10-19';
import { generate_60_69 } from './templates/60-69';
import { generate_70_79 } from './templates/70-79';
import { generate_90_100 } from './templates/90-100';
import { generate_20_29 } from './templates/20-29';
import { generate_30_39 } from './templates/30-39';
import { generate_50_59 } from './templates/50-59';
import { generate_40_49 } from './templates/40-49';

clearDirTemplate(() => {
	cpToTemplate_1_9();

	generate_10_19();
	generate_20_29();
	generate_30_39();
	generate_40_49();
	generate_50_59();
	generate_60_69();
	generate_70_79();
	generate_80_89();
	generate_90_100();
});

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

const vec_0 = [`( 0 )`, `( R - SQRT(R * R - (${X} * ${X} + ${Y} * ${Y} / 4)) )`];
const vec_1 = [`( -( SIN(${alpha_deg}) * ${z_L}) )`, `( COS(${alpha_deg}) * ${z_L} )`];
const vec_2 = [`( (${x1} + ${x0}) / 2) + ${vec_1[0]}`, `( (${y1} + ${y0}) / 2) + ${vec_1[1]}`];

const A = `(${f.x_2} + ${f.y_2})`;

const f_sqrt = `( SQRT( -(${f.y_2}) * ${A} * ((-(4 * R * R)) + ${A})) )`;

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
		<p name="R" desc="[мм] Радиус правой стороны" default="300figure_38__38.0"></p>
		
		${new Arc_2points_and_radius([x0, y0], [x1, y1], 'R', 'left').generateParam(
			'Радиус правой стороны должен быть больше',
		)}

		${new Condition(' Длина основания должна быть больше суммы двух верхних длин', `W2 + W3 < W1`)}
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

const figure_51: IGenerate = {
	name: `Прямоугольник с закруглением и центральным радиусом`,
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
	name: `Прямоугольник с закруглением`,
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

// const figure_53: IGenerate = {
// 	name: `Соединительный узел с прямоугольным основанием`,
// 	primitives: [
// 		new Arc(['R', 'H - R'], 'R', 'M_PI', 'a * M_PI / 180', true),
// 		new LinePath([
// 			['R * COS(a) + R', 'R * SIN(a) + H - R'],
// 			['W', 0],
// 			[0, 0],
// 			[0, 'H - R'],
// 		]),
// 	],
// 	params: `
// 	<params>
// 		<p name="a" desc="[градусы] Угол касательной справа" default="20.0"></p>

// 		<p name="W" desc="[мм] Ширина детали" default="200.0"></p>
// 		<p name="H" desc="[мм] Высота детали" default="150.0"></p>

// 		<p name="R" desc="[мм] Радиус верхнего закругления" default="60.0"></p>

// 		${new Condition('Радиус должен быть меньше половины длины', 'R < W / 2')}
// 	</params>
// 	`,
// };

const figure_54_p: { [s: string]: [coordinate, coordinate] } = {
	0: ['((W/2) - R)', 0],
	1: ['-((W/2) - R)', 0],
	2: ['-(W/2)', 'R'],
	3: ['-(W/2)', 'H - R'],
	4: ['R - W/2', 'H'],
	5: ['W/2 - R', 'H'],
	6: ['W/2', 'H-R'],
	7: ['W/2', 'R'],
};

const figure_54: IGenerate = {
	name: `Прямоугольный фланец с центральной окружностью`,
	primitives: [
		new LinePath([figure_54_p[0], figure_54_p[1]]),
		new Arc(['-((W/2) - R)', 'R'], 'R', '3 * M_PI/2', '2 * M_PI /2', true),

		new LinePath([figure_54_p[2], figure_54_p[3]]),
		new Arc(['R - W/2', 'H - R'], 'R', '2 * M_PI/2', '1 * M_PI /2', true),

		new LinePath([figure_54_p[4], figure_54_p[5]]),
		new Arc(['W/2 - R', 'H - R'], 'R', '1 * M_PI/2', '0 * M_PI /2', true),

		new LinePath([figure_54_p[6], figure_54_p[7]]),
		new Arc(['((W/2) - R)', 'R'], 'R', '0 * M_PI/2', '3 * M_PI /2', true),

		new Circle(['X', 'Y + H / 2'], 'R2'),

		new Circle(['(-W/2) + dL', 'dL'], 'R1'),
		new Circle(['0', 'dL'], 'R1'),
		new Circle(['W/2 - dL', 'dL'], 'R1'),

		new Circle(['W/2 - dL', 'H - dL'], 'R1'),
		new Circle(['0', 'H - dL'], 'R1'),
		new Circle(['(-W/2) + dL', 'H - dL'], 'R1'),
	],
	params: `
	<params>
		
		<p name="W" desc="[мм] Ширина детали" default="400.0"></p>
		<p name="H" desc="[мм] Высота детали" default="300.0"></p>
		
		<p name="R" desc="[мм] Радиус угловых закруглений" default="20.0"></p>
		<p name="R1" desc="[мм] Радиус окружностей" default="20.0"></p>
		<p name="R2" desc="[мм] Радиус центральной окружности" default="65.0"></p>
		
		<p name="X" desc="[мм] Смещение центральной окружности по X" default="0.0"></p>
		<p name="Y" desc="[мм] Смещение центральной окружности по Y" default="0.0"></p>

		<p name="dL" desc="[мм] Смещение отверстий от краев" default="30.0"></p>
		
		${new Condition('Радиус центральной окружности должен быть меньше двойной ширины', 'R2 < W / 2')}
		${new Condition(
			'Радиус центральной окружности должен вмещаться по высоте',
			'R2 < (H/2) - ((dL) + (R1))',
		)}
		</params>
	`,
};

const figure_55: IGenerate = {
	name: `Трапециевидное соединение c переменной окружностью`,
	primitives: [
		new LinePath([
			[0, 0],
			[0, 'H2'],
			['(W/2) - (W1/2)', 'H'],
			['(W/2) + (W1/2)', 'H'],
			['W', 'H1'],
			['W', 0],
			[0, 0],
		]),

		new Circle(['W/2 + X', 'H/2 + Y'], 'R'),
	],
	params: `
	<params>
		
		<p name="W" desc="[мм] Ширина детали" default="400.0"></p>
		<p name="W1" desc="[мм] Ширина верхней части" default="200.0"></p>
		
		<p name="H" desc="[мм] Высота детали" default="300.0"></p>
		<p name="H1" desc="[мм] Высота детали справа" default="200.0"></p>
		<p name="H2" desc="[мм] Высота детали слева" default="150.0"></p>
		
		<p name="R" desc="[мм] Радиус центральной окружности" default="70.0"></p>
		<p name="X" desc="[мм] Смещение окружности по X" default="0.0"></p>
		<p name="Y" desc="[мм] Смещение окружности по Y" default="0.0"></p>

		${new Condition('Высота детали должна быть больше правой стороны', 'H > H1')}		
		${new Condition('Высота детали должна быть больше левой стороны', 'H > H2')}		
		${new Condition('Центральная окружность должна помещаться', 'R < W / 2')}
		
		</params>
	`,
};

const figure_56: IGenerate = {
	name: `Трапециевидное соединение c переменной окружностью 2`,
	primitives: [
		new LinePath([
			['W', 'H1'],
			['W', 0],
			[0, 0],
			[0, 'H2'],
		]),

		new Arc_2points_and_radius([0, 'H2'], ['(W/2) - (W1/2)', 'H'], 'R1', 'right'),
		new LinePath([
			['(W/2) - (W1/2)', 'H'],
			['(W/2) + (W1/2)', 'H'],
		]),
		new Arc_2points_and_radius(['(W/2) + (W1/2)', 'H'], ['W', 'H1'], 'R1', 'right'),
		new Circle(['W/2 + X', 'H/2 + Y'], 'R'),
	],
	params: `
	<params>
		
		<p name="W" desc="[мм] Ширина детали" default="400.0"></p>
		<p name="W1" desc="[мм] Ширина верхней части" default="200.0"></p>
		
		<p name="H" desc="[мм] Высота детали" default="300.0"></p>
		<p name="H1" desc="[мм] Высота детали справа" default="200.0"></p>
		<p name="H2" desc="[мм] Высота детали слева" default="150.0"></p>
		
		<p name="R" desc="[мм] Радиус центральной окружности" default="70.0"></p>
		<p name="X" desc="[мм] Смещение окружности по X" default="0.0"></p>
		<p name="Y" desc="[мм] Смещение окружности по Y" default="0.0"></p>

		<p name="R1" desc="[мм] Радиус скругления боковых сторон должен быть больше" default="200.0"></p>
		${new Arc_2points_and_radius([0, 'H2'], ['(W/2) - (W1/2)', 'H'], 'R1').generateParam(
			'Радиус скругления боковых сторон',
		)}

		${new Condition('Высота детали должна быть больше правой стороны', 'H > H1')}		
		${new Condition('Высота детали должна быть больше левой стороны', 'H > H2')}		
		${new Condition('Центральная окружность должна помещаться', 'R < W / 2')}
		
		
		</params>
	`,
};

const figure_57: IGenerate = {
	name: `Трапециевидное соединение c креплениями 2`,
	primitives: [
		new LinePath([
			['W', 'H1'],
			['W', 0],
			[0, 0],
			[0, 'H2'],
		]),

		new Arc_2points_and_radius([0, 'H2'], ['(W/2) - (W1/2)', 'H'], 'R1', 'right'),
		new LinePath([
			['(W/2) - (W1/2)', 'H'],
			['(W/2) + (W1/2)', 'H'],
		]),
		new Arc_2points_and_radius(['(W/2) + (W1/2)', 'H'], ['W', 'H1'], 'R1', 'right'),

		new Circle(['dL', 'dL'], 'R2'),
		new Circle(['(W/2)  + (dL) - (W1/2)', 'H - dL'], 'R2'),
		new Circle(['(W/2) + (W1/2) - dL', 'H - dL'], 'R2'),
		new Circle(['W - dL', 'dL'], 'R2'),
	],
	params: `
	<params>
		
		<p name="W" desc="[мм] Ширина детали" default="400.0"></p>
		<p name="W1" desc="[мм] Ширина верхней части" default="200.0"></p>
		
		<p name="H" desc="[мм] Высота детали" default="300.0"></p>
		<p name="H1" desc="[мм] Высота детали справа" default="200.0"></p>
		<p name="H2" desc="[мм] Высота детали слева" default="150.0"></p>
		
		<p name="R1" desc="[мм] Радиус скругления боковых сторон" default="200.0"></p>

		<p name="dL" desc="[мм] Отступ от края для центра креплений" default="30.0"></p>
		<p name="R2" desc="[мм] Радиус креплений" default="20.0"></p>

		${new Arc_2points_and_radius([0, 'H2'], ['(W/2) - (W1/2)', 'H'], 'R1').generateParam(
			'Радиус скругления боковых сторон должен быть больше',
		)}

		${new Condition('Высота детали должна быть больше правой стороны', 'H > H1')}		
		${new Condition('Высота детали должна быть больше левой стороны', 'H > H2')}		
		
		${new Condition('Отступ креплений должен быть больше радиусов креплений ', 'dL > R2')}		
	
		
		</params>
	`,
};

const figure_58: IGenerate = {
	name: `Трапециевидное соединение c креплениями`,
	primitives: [
		new LinePath([
			['W', 'H1'],
			['W', 0],
			[0, 0],
			[0, 'H2'],
		]),

		new LinePath([
			[0, 'H2'],
			['(W/2) - (W1/2)', 'H'],
		]),
		new LinePath([
			['(W/2) - (W1/2)', 'H'],
			['(W/2) + (W1/2)', 'H'],
		]),
		new LinePath([
			['(W/2) + (W1/2)', 'H'],
			['W', 'H1'],
		]),

		new Circle(['dL', 'dL'], 'R2'),
		new Circle(['(W/2)  + (dL) - (W1/2)', 'H - dL'], 'R2'),
		new Circle(['(W/2) + (W1/2) - dL', 'H - dL'], 'R2'),
		new Circle(['W - dL', 'dL'], 'R2'),
	],
	params: `
	<params>
		
		<p name="W" desc="[мм] Ширина детали" default="400.0"></p>
		<p name="W1" desc="[мм] Ширина верхней части" default="200.0"></p>
		
		<p name="H" desc="[мм] Высота детали" default="300.0"></p>
		<p name="H1" desc="[мм] Высота детали справа" default="200.0"></p>
		<p name="H2" desc="[мм] Высота детали слева" default="150.0"></p>
		
		<p name="dL" desc="[мм] Отступ от края для центра креплений" default="30.0"></p>
		<p name="R2" desc="[мм] Радиус креплений" default="20.0"></p>

		${new Condition('Высота детали должна быть больше правой стороны', 'H > H1')}		
		${new Condition('Высота детали должна быть больше левой стороны', 'H > H2')}		
		
		${new Condition('Отступ креплений должен быть больше радиусов креплений ', 'dL > R2')}		
	
		
		</params>
	`,
};

// ${new Condition('Ширина должна быть меньше половины радиуса', 'R < W / 2 ')}
// ${new Condition('Высота должна быть меньше половины радиуса', 'R < H / 2 ')}

const figure_59_p: { [s: string]: [coordinate, coordinate] } = {
	0: ['((W/2) - R)', 0],
	1: ['-((W/2) - R)', 0],
	2: ['-(W/2)', 'R'],
	3: ['-(W/2)', 'H - R'],
	4: ['R - W/2', 'H'],
	5: ['W/2 - R', 'H'],
	6: ['W/2', 'H-R'],
	7: ['W/2', 'R'],
};

const figure_59: IGenerate = {
	name: `Прямоугольник с выемкой`,
	primitives: [
		new LinePath([figure_59_p[0], ['X', 'Y'], figure_59_p[1]]),
		new Arc(['-((W/2) - R)', 'R'], 'R', '3 * M_PI/2', '2 * M_PI /2', true),

		new LinePath([figure_59_p[2], figure_59_p[3]]),
		new Arc(['R - W/2', 'H - R'], 'R', '2 * M_PI/2', '1 * M_PI /2', true),

		new LinePath([figure_59_p[4], figure_59_p[5]]),
		new Arc(['W/2 - R', 'H - R'], 'R', '1 * M_PI/2', '0 * M_PI /2', true),

		new LinePath([figure_59_p[6], figure_59_p[7]]),
		new Arc(['((W/2) - R)', 'R'], 'R', '0 * M_PI/2', '3 * M_PI /2', true),

		// Центральная окружность
		// new Circle(['X', 'Y + H / 2'], 'R2'),

		new Circle(['(-W/2) + dL', 'dL'], 'R1'),
		new Circle(['W/2 - dL', 'dL'], 'R1'),

		new Circle(['W/2 - dL', 'H - dL'], 'R1'),
		new Circle(['0', 'H - dL'], 'R1'),
		new Circle(['(-W/2) + dL', 'H - dL'], 'R1'),
	],
	params: `
	<params>
		
		<p name="W" desc="[мм] Ширина детали" default="400.0"></p>
		<p name="H" desc="[мм] Высота детали" default="300.0"></p>
		
		<p name="R" desc="[мм] Радиус угловых закруглений" default="20.0"></p>
		<p name="R1" desc="[мм] Радиус окружностей" default="15.0"></p>

		<p name="R2" desc="[мм] Радиус центральной окружности" default="65.0"></p>
		
		<p name="Y" desc="[мм] Смещение точки выемки по высоте" default="100.0"></p>
		<p name="X" desc="[мм] Смещение точки выемки по ширине" default="0.0"></p>

		<p name="dL" desc="[мм] Смещение отверстий от краев" default="30.0"></p>
		
		${new Condition('Радиус центральной окружности должен быть меньше двойной ширины', 'R2 < W / 2')}
		${new Condition(
			'Радиус центральной окружности должен вмещаться по высоте',
			'R2 < (H/2) - ((dL) + (R1))',
		)}
		</params>
	`,
};

const figure_53: IGenerate = {
	name: `Прямоугольник с выемкой и центральной окружностью`,
	primitives: [
		new LinePath([figure_59_p[0], ['X1', 'Y1'], figure_59_p[1]]),
		new Arc(['-((W/2) - R)', 'R'], 'R', '3 * M_PI/2', '2 * M_PI /2', true),

		new LinePath([figure_59_p[2], figure_59_p[3]]),
		new Arc(['R - W/2', 'H - R'], 'R', '2 * M_PI/2', '1 * M_PI /2', true),

		new LinePath([figure_59_p[4], figure_59_p[5]]),
		new Arc(['W/2 - R', 'H - R'], 'R', '1 * M_PI/2', '0 * M_PI /2', true),

		new LinePath([figure_59_p[6], figure_59_p[7]]),
		new Arc(['((W/2) - R)', 'R'], 'R', '0 * M_PI/2', '3 * M_PI /2', true),

		// Центральная окружность
		new Circle(['X', 'Y + H / 2'], 'R2'),

		new Circle(['(-W/2) + dL', 'dL'], 'R1'),
		new Circle(['W/2 - dL', 'dL'], 'R1'),

		new Circle(['W/2 - dL', 'H - dL'], 'R1'),
		new Circle(['0', 'H - dL'], 'R1'),
		new Circle(['(-W/2) + dL', 'H - dL'], 'R1'),
	],
	params: `
	<params>
		
		<p name="W" desc="[мм] Ширина детали" default="400.0"></p>
		<p name="H" desc="[мм] Высота детали" default="300.0"></p>
		
		<p name="R" desc="[мм] Радиус угловых закруглений" default="20.0"></p>
		<p name="R1" desc="[мм] Радиус окружностей" default="15.0"></p>

		<p name="R2" desc="[мм] Радиус центральной окружности" default="60.0"></p>
		
		<p name="X" desc="[мм] Смещение центра окружности по ширине" default="0.0"></p>
		<p name="Y" desc="[мм] Смещение центра окружности по высоте" default="0.0"></p>
		

		<p name="X1" desc="[мм] Смещение точки выемки по ширине" default="0.0"></p>
		<p name="Y1" desc="[мм] Смещение точки выемки по высоте" default="70.0"></p>
		

		<p name="dL" desc="[мм] Смещение отверстий от краев" default="30.0"></p>
		
		${new Condition('Радиус центральной окружности должен быть меньше двойной ширины', 'R2 < W / 2')}
		${new Condition(
			'Радиус центральной окружности должен вмещаться по высоте',
			'R2 < (H/2) - ((dL) + (R1))',
		)}
		</params>
	`,
};

// const figures__30_39 = [
// 	figure_26__30,
// 	figure_29__31,
// 	figure_30__32,
// 	figure_35__33,

// 	figure_36__34,
// 	figure_36_left__35,
// 	figure_37__36,
// 	figure_37_left__37,
// 	figure_38__38,
// 	figure_39__39,
// ];
