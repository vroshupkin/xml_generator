export type coordinate = number | string;

export interface IFigureOperation {
	rotate(point: [coordinate, coordinate]): void;
	scale(size: number): void;
	moveBy(point: [coordinate, coordinate]): void;
}
