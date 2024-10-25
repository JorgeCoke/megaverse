import { injectable } from "inversify";
import { Polyanet } from "../polyanet.class";
import { AstroBuilder } from "./astro.builder";

@injectable()
export class PolyanetBuilder extends AstroBuilder<Polyanet> {
	// Nothing

	constructor() {
		super();
		this.astro = new Polyanet();
	}
}
