import type { Coords } from "../types/coords.type";

export class Astro<AstroType> {
	coords: Coords;
	type: AstroType;

	constructor(coords?: Coords) {
		this.coords = coords;
	}
}
