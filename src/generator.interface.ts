export type coordinate = number | string;

export interface IDetail {
	order: number;
	pronest_name: string;
	aria_name: string;
	done: boolean;
	questions?: string;
}
