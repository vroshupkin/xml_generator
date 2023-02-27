import { generate, IGenerate } from '../../generator';
import { Arc, Arc_2points_and_radius, Circle, LinePath, LineXML, Rotate } from '../figures';
import { clearDirTemplate } from '../common/terminal';
import { Condition, GenerateVariable } from '../condition';
import { coordinate } from '../figure.interface';
import { checkBracker } from '../common/parser';

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

export const generate_40_49 = (): void => {
	generate(figure_40);
	generate(figure_41);
	generate(figure_42);
	generate(figure_43);
	generate(figure_44);
	generate(figure_45);
	generate(figure_46);
	generate(figure_47);
	generate(figure_48);
	generate(figure_49);
};
