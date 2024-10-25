import { AstroType } from "../../enum/astro-type.enum";
import type { Coords } from "../../types/coords.type";
import { ComethBuilder } from "../builders/cometh.builder";
import { PolyanetBuilder } from "../builders/polyanet.builder";
import { SoloonBuilder } from "../builders/soloon.builder";
import { AstroDirector } from "./astro.director";

describe("AstroDirector", () => {
	let astroDirector: AstroDirector;

	beforeEach(() => {
		astroDirector = new AstroDirector(
			new PolyanetBuilder(),
			new SoloonBuilder(),
			new ComethBuilder(),
		);
	});

	it("Should return a Polyanet, when buildPolyanet is used", () => {
		const coords: Coords = { row: 0, column: 1 };
		const polyanet = astroDirector.buildPolyanet(coords);

		expect(polyanet).toEqual({
			coords,
			type: AstroType.POLYANET,
		});
	});

	it("Should return a Red Soloon, when buildRedSoloon is used", () => {
		const coords: Coords = { row: 0, column: 1 };
		const soloon = astroDirector.buildRedSoloon(coords);

		expect(soloon).toEqual({
			coords,
			color: "red",
			type: AstroType.SOLOON,
		});
	});

	it("Should return a Up Cometh, when buildUpCometh is used", () => {
		const coords: Coords = { row: 0, column: 1 };
		const cometh = astroDirector.buildUpCometh(coords);

		expect(cometh).toEqual({
			coords,
			direction: "up",
			type: AstroType.COMETH,
		});
	});
});
