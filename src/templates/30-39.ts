import { generate, IGenerate } from '../generator';
import { Arc, Arc_2points_and_radius, Circle, LinePath, LineXML, Rotate } from '../figures';
import { clearDirTemplate } from '../common/terminal';
import { Condition } from '../condition';
import { coordinate } from '../figure.interface';
import { checkBracker } from '../common/parser';

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

export const generate_30_39 = (): void => {
	generate(figure_26__30);
	generate(figure_29__31);
	generate(figure_30__32);
	generate(figure_35__33);

	generate(figure_36__34);
	generate(figure_36_left__35);
	generate(figure_37__36);
	generate(figure_37_left__37);
	generate(figure_38__38);
	generate(figure_39__39);
};
