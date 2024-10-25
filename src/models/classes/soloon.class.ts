import { AstroType } from "../enum/astro-type.enum";
import type { Coords } from "../types/coords.type";
import type { SoloonColor } from "../types/soloon-color.type";
import { Astro } from "./astro.class";

export class Soloon extends Astro<AstroType.SOLOON> {
	color: SoloonColor;

	constructor(coords?: Coords, color?: SoloonColor) {
		super(coords);
		this.type = AstroType.SOLOON;
		this.color = color;
	}
}
