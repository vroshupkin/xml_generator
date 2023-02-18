export class Condition {
	/**
	 *
	 * @param message Сообщение при возникновение ошибки
	 * @param condition
	 */
	constructor(private message: string, private condition: string) {}

	toString(): string {
		return `<condition text="${this.message}"><![CDATA[${this.condition}]]></condition>`;
	}
}

export class GenerateVariable {
	constructor(
		private variable_name: string,
		private description: string,
		private default_value: number,
	) {}

	toString(): string {
		return `<p name="${this.variable_name}" desc="${this.description}" default="${this.default_value}"></p>`;
	}
}
