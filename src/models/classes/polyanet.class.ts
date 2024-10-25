import { AstroType } from "../enum/astro-type.enum";
import type { Coords } from "../types/coords.type";
import { Astro } from "./astro.class";

export class Polyanet extends Astro<AstroType.POLYANET> {
	constructor(coords?: Coords) {
		super(coords);
		this.type = AstroType.POLYANET;
	}
}
