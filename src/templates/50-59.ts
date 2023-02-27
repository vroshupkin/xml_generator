import { generate, IGenerate } from '../../generator';
import { Arc, Arc_2points_and_radius, Circle, LinePath, LineXML, Rotate } from '../figures';
import { clearDirTemplate } from '../common/terminal';
import { Condition } from '../condition';
import { coordinate } from '../figure.interface';
import { checkBracker } from '../common/parser';

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

export const generate_50_59 = (): void => {
	generate(figure_50);
	generate(figure_51);
	generate(figure_52);

	generate(figure_53);
	generate(figure_54);
	generate(figure_55);

	generate(figure_56);
	generate(figure_57);
	generate(figure_58);

	generate(figure_59);
};
