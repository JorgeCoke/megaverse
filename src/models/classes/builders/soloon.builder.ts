import { injectable } from "inversify";
import type { SoloonColor } from "../../types/soloon-color.type";
import { Soloon } from "../soloon.class";
import { AstroBuilder } from "./astro.builder";

@injectable()
export class SoloonBuilder extends AstroBuilder<Soloon> {
	constructor() {
		super();
		this.astro = new Soloon();
	}

	setColor(color: SoloonColor) {
		this.astro.color = color;
		return this;
	}
}
