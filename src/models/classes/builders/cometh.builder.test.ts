import { AstroType } from "../../enum/astro-type.enum";
import type { ComethDirection } from "../../types/cometh-direction.type";
import type { Coords } from "../../types/coords.type";
import { ComethBuilder } from "./cometh.builder";

describe("ComethBuilder", () => {
	let comethBuilder: ComethBuilder;

	beforeEach(() => {
		comethBuilder = new ComethBuilder();
	});

	it("Should return an empty cometh, when no builder method is used", () => {
		const cometh = comethBuilder.get();

		expect(cometh).toEqual({
			coords: undefined,
			direction: undefined,
			type: AstroType.COMETH,
		});
	});

	it("Should return a cometh with coords, when setCoords method is used", () => {
		const coords: Coords = { row: 0, column: 1 };
		const cometh = comethBuilder.setCoords(coords).get();

		expect(cometh).toEqual({
			coords,
			direction: undefined,
			type: AstroType.COMETH,
		});
	});

	it("Should return a cometh with coords and direction, when setCoords and setDirection methods are used", () => {
		const coords: Coords = { row: 0, column: 1 };
		const direction: ComethDirection = "down";
		const cometh = comethBuilder
			.setCoords(coords)
			.setDirection(direction)
			.get();

		expect(cometh).toEqual({
			coords,
			direction,
			type: AstroType.COMETH,
		});
	});
});
