import { generate, IGenerate } from '../../generator';
import { Arc, Circle, LinePath, Rotate } from '../figures';
import { clearDirTemplate } from '../common/terminal';
import { Condition } from '../condition';

const f0_x = ['0', 'W/2 - (R + dW/2)', 'W/2 - dW/2', 'W/2 + dW/2', 'W/2 + dW/2 + R', 'W'];
const f0_y: (string | number)[] = [
	0,
	'H1 - (dW/2 + R)',
	'H1 - dW/2',
	'H1 + dW/2',
	'(H1 + dW/2 + R)',
	'H',
];

const figure_90: IGenerate = {
	name: `Крест с внутренним скруглением c окружностью`,
	primitives: [
		new LinePath([
			[f0_x[1], f0_y[2]],
			[f0_x[0], f0_y[2]],
			[f0_x[0], f0_y[3]],
			[f0_x[1], f0_y[3]],
		]),
		new Arc([f0_x[1], f0_y[4]], 'R', '3 * M_PI / 2', '0', false),

		new LinePath([
			[f0_x[2], f0_y[4]],
			[f0_x[2], f0_y[5]],
			[f0_x[3], f0_y[5]],
			[f0_x[3], f0_y[4]],
		]),
		new Arc([f0_x[4], f0_y[4]], 'R', '2 * M_PI / 2', '3 * M_PI / 2', false),

		new LinePath([
			[f0_x[4], f0_y[3]],
			[f0_x[5], f0_y[3]],
			[f0_x[5], f0_y[2]],
			[f0_x[4], f0_y[2]],
		]),
		new Arc([f0_x[4], f0_y[1]], 'R', '1 * M_PI / 2', '2 * M_PI / 2', false),

		new LinePath([
			[f0_x[3], f0_y[1]],
			[f0_x[3], f0_y[0]],
			[f0_x[2], f0_y[0]],
			[f0_x[2], f0_y[1]],
		]),
		new Arc([f0_x[1], f0_y[1]], 'R', '0 * M_PI / 2', '1 * M_PI / 2', false),

		new Circle(['W/2', 'H1'], 'Rc'),
	],
	params: `   
	<params>
		
		<p name="W" desc="[мм] Ширина" default="180.0"></p>
		<p name="H" desc="[мм] Высота" default="200.0"></p>

		<p name="H1" desc="[мм] Высота середины" default="100.0"></p>

        <p name="dW" desc="[мм] Толщина креста" default="20.0"></p>
		<p name="R" desc="[мм] Радиус скругления центра" default="25.0"></p>
    
        <p name="Rc" desc="[мм] Радиус центральной окружности" default="15.0"></p>
        
	</params>
	`,
};

const figure_91: IGenerate = {
	name: `Крест с внутренним скруглением c окружностью и креплениями`,
	primitives: [
		new LinePath([
			[f0_x[1], f0_y[2]],
			[f0_x[0], f0_y[2]],
			[f0_x[0], f0_y[3]],
			[f0_x[1], f0_y[3]],
		]),
		new Arc([f0_x[1], f0_y[4]], 'R', '3 * M_PI / 2', '0', false),

		new LinePath([
			[f0_x[2], f0_y[4]],
			[f0_x[2], f0_y[5]],
			[f0_x[3], f0_y[5]],
			[f0_x[3], f0_y[4]],
		]),
		new Arc([f0_x[4], f0_y[4]], 'R', '2 * M_PI / 2', '3 * M_PI / 2', false),

		new LinePath([
			[f0_x[4], f0_y[3]],
			[f0_x[5], f0_y[3]],
			[f0_x[5], f0_y[2]],
			[f0_x[4], f0_y[2]],
		]),
		new Arc([f0_x[4], f0_y[1]], 'R', '1 * M_PI / 2', '2 * M_PI / 2', false),

		new LinePath([
			[f0_x[3], f0_y[1]],
			[f0_x[3], f0_y[0]],
			[f0_x[2], f0_y[0]],
			[f0_x[2], f0_y[1]],
		]),
		new Arc([f0_x[1], f0_y[1]], 'R', '0 * M_PI / 2', '1 * M_PI / 2', false),

		new Circle(['W/2', 'H1'], 'Rc'),

		new Circle(['R1 + dL', 'H1'], 'R1'),
		new Circle(['W / 2', 'H - (R1 + dL)'], 'R1'),
		new Circle(['W - (R1 + dL)', 'H1'], 'R1'),
		new Circle(['W / 2', 'R1 + dL'], 'R1'),
	],
	params: `   
	<params>
		
		<p name="W" desc="[мм] Ширина" default="180.0"></p>
		<p name="H" desc="[мм] Высота" default="200.0"></p>

		<p name="H1" desc="[мм] Высота середины" default="100.0"></p>

        <p name="dW" desc="[мм] Толщина креста" default="30.0"></p>
		<p name="R" desc="[мм] Радиус скругления центра" default="25.0"></p>
    
        <p name="Rc" desc="[мм] Радиус центральной окружности" default="15.0"></p>
        
		<p name="R1" desc="[мм] Радиус креплений" default="10.0"></p>
		<p name="dL" desc="[мм] Отступ креплений" default="5.0"></p>
		
	</params>
	`,
};

const figure_92: IGenerate = {
	name: `Крест с внутренним скруглением`,
	primitives: [
		new LinePath([
			[f0_x[1], f0_y[2]],
			[f0_x[0], f0_y[2]],
			[f0_x[0], f0_y[3]],
			[f0_x[1], f0_y[3]],
		]),
		new Arc([f0_x[1], f0_y[4]], 'R', '3 * M_PI / 2', '0', false),

		new LinePath([
			[f0_x[2], f0_y[4]],
			[f0_x[2], f0_y[5]],
			[f0_x[3], f0_y[5]],
			[f0_x[3], f0_y[4]],
		]),
		new Arc([f0_x[4], f0_y[4]], 'R', '2 * M_PI / 2', '3 * M_PI / 2', false),

		new LinePath([
			[f0_x[4], f0_y[3]],
			[f0_x[5], f0_y[3]],
			[f0_x[5], f0_y[2]],
			[f0_x[4], f0_y[2]],
		]),
		new Arc([f0_x[4], f0_y[1]], 'R', '1 * M_PI / 2', '2 * M_PI / 2', false),

		new LinePath([
			[f0_x[3], f0_y[1]],
			[f0_x[3], f0_y[0]],
			[f0_x[2], f0_y[0]],
			[f0_x[2], f0_y[1]],
		]),
		new Arc([f0_x[1], f0_y[1]], 'R', '0 * M_PI / 2', '1 * M_PI / 2', false),
	],
	params: `   
	<params>
		
		<p name="W" desc="[мм] Ширина" default="180.0"></p>
		<p name="H" desc="[мм] Высота" default="200.0"></p>

		<p name="H1" desc="[мм] Высота середины" default="100.0"></p>

        <p name="dW" desc="[мм] Толщина креста" default="30.0"></p>
		<p name="R" desc="[мм] Радиус скругления центра" default="25.0"></p>
    
	</params>
	`,
};

const f_1_w = ['0', 'W1', 'W1 + W2', 'W1 + W2 + W3', 'W1 + W2 + W3 + W2', 'W1 + W2 + W3 + W2 + W1'];
const f_1_h = ['0', 'H1', 'H1 + H2', 'H1 + H2 + H3', 'H1 + H2 + H3 + H4'];

const figure_93: IGenerate = {
	name: `Многообразное фигура`,
	primitives: [
		new LinePath([
			[f_1_w[0], f_1_h[0]],
			[f_1_w[0], f_1_h[1]],
			[f_1_w[1], f_1_h[2]],
			[f_1_w[1], f_1_h[3]],
			[f_1_w[2], f_1_h[3]],
			[f_1_w[2], f_1_h[3]],
			[f_1_w[2], f_1_h[4]],
			[f_1_w[3], f_1_h[4]],
			[f_1_w[3], f_1_h[3]],
			[f_1_w[4], f_1_h[3]],
			[f_1_w[4], f_1_h[2]],
			[f_1_w[5], f_1_h[1]],
			[f_1_w[5], f_1_h[0]],
			[f_1_w[4], f_1_h[0]],
			[f_1_w[4], f_1_h[1]],
			[f_1_w[3], f_1_h[1]],
			[f_1_w[3], f_1_h[0]],
			[f_1_w[2], f_1_h[0]],
			[f_1_w[2], f_1_h[1]],
			[f_1_w[1], f_1_h[1]],
			[f_1_w[1], f_1_h[0]],
			[f_1_w[0], f_1_h[0]],
		]),
	],
	params: `   
	<params>
		
		<p name="W1" desc="[мм] Ширина 1" default="200.0"></p>
		<p name="W2" desc="[мм] Ширина 2" default="150.0"></p>
		<p name="W3" desc="[мм] Ширина 3" default="100.0"></p>
		<p name="W4" desc="[мм] Ширина 4" default="100.0"></p>
		<p name="W5" desc="[мм] Ширина 5" default="100.0"></p>
		
		<p name="H1" desc="[мм] Высота 1" default="100.0"></p>
		<p name="H2" desc="[мм] Высота 2" default="100.0"></p>
		<p name="H3" desc="[мм] Высота 3" default="100.0"></p>
		<p name="H4" desc="[мм] Высота 4" default="100.0"></p>

        
	</params>
	`,
};

const figure_94: IGenerate = {
	name: `Многообразное фигура с окружностью`,
	primitives: [
		new LinePath([
			[f_1_w[0], f_1_h[0]],
			[f_1_w[0], f_1_h[1]],
			[f_1_w[1], f_1_h[2]],
			[f_1_w[1], f_1_h[3]],
			[f_1_w[2], f_1_h[3]],
			[f_1_w[2], f_1_h[3]],
			[f_1_w[2], f_1_h[4]],
			[f_1_w[3], f_1_h[4]],
			[f_1_w[3], f_1_h[3]],
			[f_1_w[4], f_1_h[3]],
			[f_1_w[4], f_1_h[2]],
			[f_1_w[5], f_1_h[1]],
			[f_1_w[5], f_1_h[0]],
			[f_1_w[4], f_1_h[0]],
			[f_1_w[4], f_1_h[1]],
			[f_1_w[3], f_1_h[1]],
			[f_1_w[3], f_1_h[0]],
			[f_1_w[2], f_1_h[0]],
			[f_1_w[2], f_1_h[1]],
			[f_1_w[1], f_1_h[1]],
			[f_1_w[1], f_1_h[0]],
			[f_1_w[0], f_1_h[0]],
		]),

		new Circle([`(${f_1_w[5]}) / 2`, `(${f_1_h[4]}) / 2`], 'Rc'),
	],
	params: `   
	<params>
		
		<p name="W1" desc="[мм] Ширина 1" default="200.0"></p>
		<p name="W2" desc="[мм] Ширина 2" default="150.0"></p>
		<p name="W3" desc="[мм] Ширина 3" default="100.0"></p>
		<p name="W4" desc="[мм] Ширина 4" default="100.0"></p>
		<p name="W5" desc="[мм] Ширина 5" default="100.0"></p>
		
		<p name="H1" desc="[мм] Высота 1" default="100.0"></p>
		<p name="H2" desc="[мм] Высота 2" default="100.0"></p>
		<p name="H3" desc="[мм] Высота 3" default="100.0"></p>
		<p name="H4" desc="[мм] Высота 4" default="100.0"></p>

		<p name="Rc" desc="[мм] Радиус центральной окружности" default="80.0"></p>
        
	</params>
	`,
};

const figure_95: IGenerate = {
	name: `Многообразное фигура с окружностью и креплениями`,
	primitives: [
		new LinePath([
			[f_1_w[0], f_1_h[0]],
			[f_1_w[0], f_1_h[1]],
			[f_1_w[1], f_1_h[2]],
			[f_1_w[1], f_1_h[3]],
			[f_1_w[2], f_1_h[3]],
			[f_1_w[2], f_1_h[3]],
			[f_1_w[2], f_1_h[4]],
			[f_1_w[3], f_1_h[4]],
			[f_1_w[3], f_1_h[3]],
			[f_1_w[4], f_1_h[3]],
			[f_1_w[4], f_1_h[2]],
			[f_1_w[5], f_1_h[1]],
			[f_1_w[5], f_1_h[0]],
			[f_1_w[4], f_1_h[0]],
			[f_1_w[4], f_1_h[1]],
			[f_1_w[3], f_1_h[1]],
			[f_1_w[3], f_1_h[0]],
			[f_1_w[2], f_1_h[0]],
			[f_1_w[2], f_1_h[1]],
			[f_1_w[1], f_1_h[1]],
			[f_1_w[1], f_1_h[0]],
			[f_1_w[0], f_1_h[0]],
		]),

		new Circle([`(${f_1_w[5]}) / 2`, `(${f_1_h[4]}) / 2`], 'Rc'),

		new Circle(['W1/2', 'H1/2'], 'R'),
		new Circle([`(${f_1_w[2] + '+' + f_1_w[3]}) / 2`, `H1/2`], 'R'),
		new Circle(
			[`(${f_1_w[2] + '+' + f_1_w[3]}) / 2`, `(${f_1_h[3] + '+' + f_1_h[4]}) / 2`],
			'R',
		),

		new Circle([`(${f_1_w[4] + '+' + f_1_w[5]}) / 2`, `H1/2`], 'R'),
	],
	params: `   
	<params>
		
		<p name="W1" desc="[мм] Ширина 1" default="200.0"></p>
		<p name="W2" desc="[мм] Ширина 2" default="150.0"></p>
		<p name="W3" desc="[мм] Ширина 3" default="100.0"></p>
		<p name="W4" desc="[мм] Ширина 4" default="100.0"></p>
		<p name="W5" desc="[мм] Ширина 5" default="100.0"></p>
		
		<p name="H1" desc="[мм] Высота 1" default="100.0"></p>
		<p name="H2" desc="[мм] Высота 2" default="100.0"></p>
		<p name="H3" desc="[мм] Высота 3" default="100.0"></p>
		<p name="H4" desc="[мм] Высота 4" default="100.0"></p>

		<p name="Rc" desc="[мм] Радиус центральной окружности" default="80.0"></p>
        

		<p name="R" desc="[мм] Радиус креплений" default="30.0"></p>
        
	</params>
	`,
};

const figure_96: IGenerate = {
	name: `Звездочка`,
	primitives: [
		new Rotate(
			[
				new LinePath([
					['L * COS(180 / N)', 'L * SIN(180 / N)'],
					['H + L', '0'],
					['L * COS((-180) / N)', 'L * SIN((-180) / N)'],
				]),
			],
			'0',
			'360 / N',
			'N',
		),
	],
	params: `   
	<params>
		<p name="L" desc="[мм] Радиус" default="30.0"></p>
		<p name="H" desc="[мм] Высота зубца" default="5.0"></p>
		<p name="N" desc="[мм] Количество зубцов" default="30.0"></p>
	</params>
	`,
};

const figure_97: IGenerate = {
	name: `Звездочка с окружностью`,
	primitives: [
		new Rotate(
			[
				new LinePath([
					['L * COS(180 / N)', 'L * SIN(180 / N)'],
					['H + L', '0'],
					['L * COS((-180) / N)', 'L * SIN((-180) / N)'],
				]),
			],
			'0',
			'360 / N',
			'N',
		),

		new Circle([0, 0], 'R1'),
	],
	params: `   
	<params>
		<p name="L" desc="[мм] Радиус" default="100.0"></p>
		<p name="H" desc="[мм] Высота зубца" default="20.0"></p>
		<p name="N" desc="[мм] Количество зубцов" default="30.0"></p>

		<p name="R1" desc="[мм] Радиус внутренней окружности" default="40.0"></p>
	</params>
	`,
};

const f_98_r1 = '( L / (2 * SIN(180 / N)) )';
const f_98_h1 = `( SQRT(${f_98_r1} * ${f_98_r1} - L * L / 4) )`;

const figure_98: IGenerate = {
	name: `Плоскозубая шестеренка с окружностью`,
	primitives: [
		new Rotate(
			[
				new LinePath([
					['-L/2', `${f_98_h1}`],
					['-dW', `${f_98_h1} + H`],
					['dW', `${f_98_h1} + H`],
					['L/2', `${f_98_h1}`],
				]),
			],
			'0',
			'360 / N',
			'N',
		),

		new Circle([0, 0], 'R1'),
	],
	params: `   
	<params>
		<p name="L" desc="[мм] Длина зубца" default="30.0"></p>
		<p name="dW" desc="[мм] Ширина выступа" default="5.0"></p>
		<p name="H" desc="[мм] Высота зубца" default="20.0"></p>
		<p name="N" desc="[мм] Количество зубцов" default="25.0"></p>

		<p name="R1" desc="[мм] Радиус внутренней окружности" default="40.0"></p>
	</params>
	`,
};

const figure_99: IGenerate = {
	name: `Плоскозубая шестеренка`,
	primitives: [
		new Rotate(
			[
				new LinePath([
					['-L/2', `${f_98_h1}`],
					['-dW', `${f_98_h1} + H`],
					['dW', `${f_98_h1} + H`],
					['L/2', `${f_98_h1}`],
				]),
			],
			'0',
			'360 / N',
			'N',
		),
	],
	params: `   
	<params>
		<p name="L" desc="[мм] Длина зубца" default="30.0"></p>
		<p name="dW" desc="[мм] Ширина выступа" default="5.0"></p>
		<p name="H" desc="[мм] Высота зубца" default="20.0"></p>
		<p name="N" desc="[мм] Количество зубцов" default="25.0"></p>

	</params>
	`,
};

const figure_100: IGenerate = {
	name: `Держатель рельсы`,
	primitives: [
		new LinePath([
			['W/2 + dW/2', 'H1 + H2 + (-h)'],
			['W/2 + dW/2', 'H1 + H2'],
			['W/2 + W1/2', 'H1 + H2'],
			['W/2 + W1/2', 'H1'],
			['W', 'H1'],
			['W', '0'],
			[0, 0],
			[0, 'H1'],
			['(W - W1) / 2', 'H1'],
			['(W - W1) / 2', 'H1 + H2'],
			['W/2 - dW/2', 'H1 + H2'],
			['W/2 - dW/2', 'H1 + H2 + (-h)'],
		]),

		new Arc(
			['W / 2', '(H1 + H2 ) - (h + ((SQRT(R * R - (dW * dW / 4)))))'],
			'R',
			'M_PI/2 + ASIN(dW / ( 2 * R))',
			'M_PI/2 - ASIN(dW / ( 2 * R))',
			false,
		),
	],
	params: `   
	<params>
		<p name="H1" desc="[мм] Высота нижней грани" default="50.0"></p>
		<p name="H2" desc="[мм] Высота верхней грани" default="50.0"></p>

		<p name="W" desc="[мм] Ширина основания" default="200.0"></p>
		<p name="W1" desc="[мм] Ширина центральной части" default="100.0"></p>

		<p name="dW" desc="[мм] Ширина прорези" default="15.0"></p>

		<p name="h" desc="[мм] Глубина прорези" default="10.0"></p>

		<p name="R" desc="[мм] Радиус окружности" default="25.0"></p>

	</params>
	`,
};

const figure_101: IGenerate = {
	name: `Держатель рельсы со скошенным основанием`,
	primitives: [
		new LinePath([
			['W/2 + dW/2', 'H1 + H2 + (-h)'],
			['W/2 + dW/2', 'H1 + H2'],
			['W/2 + W1/2', 'H1 + H2'],
			['W/2 + W1/2', 'H1'],

			['W', '0'],
			[0, 0],

			['(W - W1) / 2', 'H1'],
			['(W - W1) / 2', 'H1 + H2'],
			['W/2 - dW/2', 'H1 + H2'],
			['W/2 - dW/2', 'H1 + H2 + (-h)'],
		]),

		new Arc(
			['W / 2', '(H1 + H2 ) - (h + ((SQRT(R * R - (dW * dW / 4)))))'],
			'R',
			'M_PI/2 + ASIN(dW / ( 2 * R))',
			'M_PI/2 - ASIN(dW / ( 2 * R))',
			false,
		),
	],
	params: `   
	<params>
		<p name="H1" desc="[мм] Высота нижней грани" default="50.0"></p>
		<p name="H2" desc="[мм] Высота верхней грани" default="50.0"></p>

		<p name="W" desc="[мм] Ширина основания" default="200.0"></p>
		<p name="W1" desc="[мм] Ширина центральной части" default="100.0"></p>

		<p name="dW" desc="[мм] Ширина прорези" default="15.0"></p>

		<p name="h" desc="[мм] Глубина прорези" default="10.0"></p>

		<p name="R" desc="[мм] Радиус окружности" default="25.0"></p>

	</params>
	`,
};

export const generate_90_100 = (): void => {
	generate(figure_90);
	generate(figure_91);
	generate(figure_92);

	generate(figure_93);
	generate(figure_94);
	generate(figure_95);
	generate(figure_96);
	generate(figure_97);
	generate(figure_98);
	generate(figure_99);

	generate(figure_100);
	generate(figure_101);
};

// clearDirTemplate(() => {
// 	generate10();
// });

// generate_90_100();
