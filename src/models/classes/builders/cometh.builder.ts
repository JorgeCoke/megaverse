import { injectable } from "inversify";
import type { ComethDirection } from "../../types/cometh-direction.type";
import { Cometh } from "../cometh.class";
import { AstroBuilder } from "./astro.builder";

@injectable()
export class ComethBuilder extends AstroBuilder<Cometh> {
	constructor() {
		super();
		this.astro = new Cometh();
	}

	setDirection(direction: ComethDirection) {
		this.astro.direction = direction;
		return this;
	}
}
