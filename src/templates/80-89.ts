import { generate, IGenerate } from '../../generator';
import { Arc, Circle, LinePath } from '../figures';
import { clearDirTemplate } from '../common/terminal';
import { Condition } from '../condition';

const figure_80: IGenerate = {
	name: `Угловое соединение с окружностью `,
	primitives: [
		new LinePath([
			[0, 'R1'],
			[0, 'H'],
			['W - dW', 'H'],
			['W', 'H - dH'],
			['W', 0],
			['R1', 0],
		]),
		new Arc([0, 0], 'R1', '0', 'M_PI / 2', false),

		new Circle(['W/2 + X', 'H/2 + Y'], 'R'),
	],
	params: `   
	<params>
		
		<p name="W" desc="[мм] Ширина" default="300.0"></p>
		<p name="H" desc="[мм] Высота" default="200.0"></p>

        <p name="dW" desc="[мм] Ширина скоса" default="100.0"></p>
		<p name="dH" desc="[мм] Высота скоса" default="100.0"></p>
    
        <p name="R" desc="[мм] Радиус центральной окружности" default="50.0"></p>
        <p name="X" desc="[мм] Смещение окружности Х" default="50.0"></p>
        <p name="Y" desc="[мм] Смещение окружности Y" default="0.0"></p>

		<p name="R1" desc="[мм] Радиус угловой окружности" default="150.0"></p>
	</params>
	`,
};

const figure_81: IGenerate = {
	name: `Угловое соединение`,
	primitives: [
		new LinePath([
			[0, 'R1'],
			[0, 'H'],
			['W - dW', 'H'],
			['W', 'H - dH'],
			['W', 0],
			['R1', 0],
		]),
		new Arc([0, 0], 'R1', '0', 'M_PI / 2', false),
	],
	params: `   
	<params>
		
		<p name="W" desc="[мм] Ширина" default="300.0"></p>
		<p name="H" desc="[мм] Высота" default="200.0"></p>

        <p name="dW" desc="[мм] Ширина скоса" default="100.0"></p>
		<p name="dH" desc="[мм] Высота скоса" default="100.0"></p>
    
		<p name="R1" desc="[мм] Радиус угловой окружности" default="150.0"></p>
	</params>
	`,
};

const figure_82: IGenerate = {
	name: `Угловое соединение c проемами`,
	primitives: [
		new LinePath([
			[0, 'R1'],
			[0, 'H'],
			['W - dW', 'H'],
			['W', 'H - dH'],
			['W', 0],
			['R1', 0],
		]),
		new Arc([0, 0], 'R1', '0', 'M_PI / 2', false),

		new Circle(['dL', 'H - dL'], 'R'),
		new Circle(['W - dL', 'dL'], 'R'),
		new Circle(['W - dW/(1.5)', 'H - dH/(1.5)'], 'R'),
	],
	params: `   
	<params>
		
		<p name="W" desc="[мм] Ширина" default="300.0"></p>
		<p name="H" desc="[мм] Высота" default="200.0"></p>

        <p name="dW" desc="[мм] Ширина скоса" default="100.0"></p>
		<p name="dH" desc="[мм] Высота скоса" default="100.0"></p>
    
		<p name="R1" desc="[мм] Радиус угловой окружности" default="150.0"></p>

        <p name="R" desc="[мм] Радиус креплений" default="15.0"></p>
        <p name="dL" desc="[мм] Отступ креплений" default="25.0"></p>

	</params>
	`,
};

const figure_83: IGenerate = {
	name: `Крест`,
	primitives: [
		new LinePath([
			['-(dW/2)', '-(dW/2)'],
			['-(dW/2 + dH)', '-(dW/2)'],
			['-(dW/2 + dH)', '(dW/2)'],

			['-(dW/2)', '(dW/2)'],
			['-(dW/2)', '(dW/2) + dH'],
			['(dW/2)', '(dW/2) + dH'],

			['(dW/2)', '(dW/2)'],
			['(dW/2) + dH', '(dW/2)'],
			['(dW/2) + dH', '-(dW/2)'],

			['(dW/2)', '-(dW/2)'],
			['(dW/2)', '-(dW/2 + dH)'],
			['-(dW/2)', '-(dW/2 + dH)'],

			['-(dW/2)', '-(dW/2)'],
		]),
	],
	params: `   
	<params>
		

        <p name="dW" desc="[мм] Ширина выступа креста" default="40.0"></p>
		<p name="dH" desc="[мм] Высота выступа креста" default="100.0"></p>
    

	</params>
	`,
};

const figure_84: IGenerate = {
	name: `Крест с окружностью`,
	primitives: [
		new LinePath([
			['-(dW/2)', '-(dW/2)'],
			['-(dW/2 + dH)', '-(dW/2)'],
			['-(dW/2 + dH)', '(dW/2)'],

			['-(dW/2)', '(dW/2)'],
			['-(dW/2)', '(dW/2) + dH'],
			['(dW/2)', '(dW/2) + dH'],

			['(dW/2)', '(dW/2)'],
			['(dW/2) + dH', '(dW/2)'],
			['(dW/2) + dH', '-(dW/2)'],

			['(dW/2)', '-(dW/2)'],
			['(dW/2)', '-(dW/2 + dH)'],
			['-(dW/2)', '-(dW/2 + dH)'],

			['-(dW/2)', '-(dW/2)'],
		]),

		new Circle([0, 0], 'R'),
	],
	params: `   
	<params>
		

        <p name="dW" desc="[мм] Ширина выступа креста" default="40.0"></p>
		<p name="dH" desc="[мм] Высота выступа креста" default="100.0"></p>
    
    	<p name="R" desc="[мм] Радиус окружности" default="20.0"></p>
    
	</params>
	`,
};

const figure_85: IGenerate = {
	name: `Крест с креплениями`,
	primitives: [
		new LinePath([
			['-(dW/2)', '-(dW/2)'],
			['-(dW/2 + dH)', '-(dW/2)'],
			['-(dW/2 + dH)', '(dW/2)'],

			['-(dW/2)', '(dW/2)'],
			['-(dW/2)', '(dW/2) + dH'],
			['(dW/2)', '(dW/2) + dH'],

			['(dW/2)', '(dW/2)'],
			['(dW/2) + dH', '(dW/2)'],
			['(dW/2) + dH', '-(dW/2)'],

			['(dW/2)', '-(dW/2)'],
			['(dW/2)', '-(dW/2 + dH)'],
			['-(dW/2)', '-(dW/2 + dH)'],

			['-(dW/2)', '-(dW/2)'],
		]),

		new Circle(['-(dH - dL) ', 0], 'R'),
		new Circle([0, '(dH - dL) '], 'R'),
		new Circle(['(dH - dL) ', 0], 'R'),
		new Circle([0, '-(dH - dL) '], 'R'),
	],
	params: `   
	<params>
		

        <p name="dW" desc="[мм] Ширина выступа креста" default="40.0"></p>
		<p name="dH" desc="[мм] Высота выступа креста" default="100.0"></p>
    
    	<p name="R" desc="[мм] Радиус окружности" default="14.0"></p>
        <p name="dL" desc="[мм] Отступ окружности" default="0.0"></p>
    
	</params>
	`,
};

const figure_86: IGenerate = {
	name: `Треугольник с выступами`,
	primitives: [
		new LinePath([
			[0, 0],
			['W', 0],
			['W', 'H'],
			['W - dW', 'H'],
			['W - dW', 'H - dH'],
			['dW', 'dH'],
			[0, 'dH'],
			[0, 0],
		]),
	],
	params: `   
	<params>
        <p name="W" desc="[мм] Ширина " default="200.0"></p>
        <p name="H" desc="[мм] Высота " default="200.0"></p>


        <p name="dW" desc="[мм] Ширина выступа" default="40.0"></p>
		<p name="dH" desc="[мм] Высота выступа" default="40.0"></p>
    
    	
	</params>
	`,
};

const figure_87: IGenerate = {
	name: `Треугольник с выступами и окружностью`,
	primitives: [
		new LinePath([
			[0, 0],
			['W', 0],
			['W', 'H'],
			['W - dW', 'H'],
			['W - dW', 'H - dH'],
			['dW', 'dH'],
			[0, 'dH'],
			[0, 0],
		]),

		new Circle(['W/(1.5) + X', 'H/3 + Y'], 'R'),
	],
	params: `   
	<params>
        <p name="W" desc="[мм] Ширина " default="200.0"></p>
        <p name="H" desc="[мм] Высота " default="200.0"></p>

        <p name="R" desc="[мм] Радиус окружности" default="40.0"></p>
        <p name="X" desc="[мм] Сдвиг окружности X" default="10.0"></p>
        <p name="Y" desc="[мм] Сдвиг окружности Y" default="-10.0"></p>

        <p name="dW" desc="[мм] Ширина выступа" default="40.0"></p>
		<p name="dH" desc="[мм] Высота выступа" default="40.0"></p>
    
    	
	</params>
	`,
};

const figure_88: IGenerate = {
	name: `Треугольник с выступами окружностью и креплениями`,
	primitives: [
		new LinePath([
			[0, 0],
			['W', 0],
			['W', 'H'],
			['W - dW', 'H'],
			['W - dW', 'H - dH'],
			['dW', 'dH'],
			[0, 'dH'],
			[0, 0],
		]),

		new Circle(['W/(1.5) + X', 'H/3 + Y'], 'R'),

		new Circle(['dW / 2', 'dH / 2'], 'R1'),
		new Circle(['W - dW / 2', 'H - dH / 2'], 'R1'),
	],
	params: `   
	<params>
        <p name="W" desc="[мм] Ширина " default="200.0"></p>
        <p name="H" desc="[мм] Высота " default="200.0"></p>

        <p name="R" desc="[мм] Радиус окружности" default="40.0"></p>
        <p name="X" desc="[мм] Сдвиг окружности X" default="10.0"></p>
        <p name="Y" desc="[мм] Сдвиг окружности Y" default="-10.0"></p>

        <p name="dW" desc="[мм] Ширина выступа" default="40.0"></p>
		<p name="dH" desc="[мм] Высота выступа" default="40.0"></p>
    
    	<p name="R1" desc="[мм] Радиус креплений" default="12.0"></p>
	</params>
	`,
};

const figure_89: IGenerate = {
	name: `Держатель рельсы с боковыми креплениями`,
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

		new Circle(['W1 /2 - R1', 'H1 / 2'], 'R1'),
		new Circle(['(W - W1 / 2) + R1', 'H1 / 2'], 'R1'),
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
        <p name="R1" desc="[мм] Радиус боковых креплений" default="15.0"></p>

	</params>
	`,
};

export const generate_80_89 = (): void => {
	generate(figure_80);
	generate(figure_81);
	generate(figure_82);
	generate(figure_83);
	generate(figure_84);
	generate(figure_85);
	generate(figure_86);
	generate(figure_87);
	generate(figure_88);
	generate(figure_89);
};

// clearDirTemplate(() => {
// 	generate10();
// });

// generate10();
