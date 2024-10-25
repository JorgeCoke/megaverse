import { AstroType } from "../enum/astro-type.enum";
import type { ComethDirection } from "../types/cometh-direction.type";
import type { Coords } from "../types/coords.type";
import { Astro } from "./astro.class";

export class Cometh extends Astro<AstroType.COMETH> {
	direction: ComethDirection;

	constructor(coords?: Coords, direction?: ComethDirection) {
		super(coords);
		this.type = AstroType.COMETH;
		this.direction = direction;
	}
}
