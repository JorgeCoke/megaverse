import { injectable } from "inversify";
import type { Coords } from "../../types/coords.type";
import type { Astro } from "../astro.class";

@injectable()
export class AstroBuilder<T extends Astro<unknown>> {
	protected astro: T;

	setCoords(coords: Coords): this {
		this.astro.coords = coords;
		return this;
	}

	get() {
		return this.astro;
	}
}
