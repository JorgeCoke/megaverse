import { inject, injectable } from "inversify";
import type { Coords } from "../../types/coords.type";
import { ComethBuilder } from "../builders/cometh.builder";
import { PolyanetBuilder } from "../builders/polyanet.builder";
import { SoloonBuilder } from "../builders/soloon.builder";

@injectable()
export class AstroDirector {
	constructor(
		@inject(PolyanetBuilder) private readonly polyanetBuilder: PolyanetBuilder,
		@inject(SoloonBuilder) private readonly soloonBuilder: SoloonBuilder,
		@inject(ComethBuilder) private readonly comethBuilder: ComethBuilder,
	) {}

	public buildPolyanet(coords: Coords) {
		return this.polyanetBuilder.setCoords(coords).get();
	}

	public buildRedSoloon(coords: Coords) {
		return this.soloonBuilder.setCoords(coords).setColor("red").get();
	}

	public buildBlueSoloon(coords: Coords) {
		return this.soloonBuilder.setCoords(coords).setColor("blue").get();
	}

	public buildPurpleSoloon(coords: Coords) {
		return this.soloonBuilder.setCoords(coords).setColor("purple").get();
	}

	public buildWhiteSoloon(coords: Coords) {
		return this.soloonBuilder.setCoords(coords).setColor("white").get();
	}

	public buildUpCometh(coords: Coords) {
		return this.comethBuilder.setCoords(coords).setDirection("up").get();
	}

	public buildDownCometh(coords: Coords) {
		return this.comethBuilder.setCoords(coords).setDirection("down").get();
	}

	public buildLeftCometh(coords: Coords) {
		return this.comethBuilder.setCoords(coords).setDirection("left").get();
	}

	public buildRightCometh(coords: Coords) {
		return this.comethBuilder.setCoords(coords).setDirection("right").get();
	}
}
