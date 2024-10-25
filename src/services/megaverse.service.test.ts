import { AstroFacadeFactory } from "../facades/astros/astro-facade.factory";
import { ComethsFacade } from "../facades/astros/factory/comeths/comeths.facade";
import { PolyanetsFacade } from "../facades/astros/factory/polyanets/polyanets.facade";
import { SoloonsFacade } from "../facades/astros/factory/soloons/soloons.facade";
import type { AstroGoal } from "../facades/megaverse/dtos/get-megaverse-map-goal.dto";
import type { MegaverseMapContentAstro } from "../facades/megaverse/dtos/get-megaverse-map.dto";
import { Env } from "../lib/env";
import { Http } from "../lib/http";
import { ComethBuilder } from "../models/classes/builders/cometh.builder";
import { PolyanetBuilder } from "../models/classes/builders/polyanet.builder";
import { SoloonBuilder } from "../models/classes/builders/soloon.builder";
import { AstroDirector } from "../models/classes/directors/astro.director";
import { AstroType } from "../models/enum/astro-type.enum";
import type { Coords } from "../models/types/coords.type";
import { MegaverseService } from "./megaverse.service";

vi.mock("../facades/astros/factory/soloons/soloons.facade");

describe("MegaverseService", () => {
	let env: Env;
	let http: Http;
	let polyanetsFacade: PolyanetsFacade;
	let soloonsFacade: SoloonsFacade;
	let comethsFacade: ComethsFacade;
	let astroFacadeFactory: AstroFacadeFactory;
	let astroDirector: AstroDirector;
	let megaverseService: MegaverseService;

	beforeEach(() => {
		env = new Env();
		http = new Http(env);
		polyanetsFacade = new PolyanetsFacade(env, http);
		soloonsFacade = new SoloonsFacade(env, http);
		comethsFacade = new ComethsFacade(env, http);

		astroFacadeFactory = new AstroFacadeFactory(
			polyanetsFacade,
			soloonsFacade,
			comethsFacade,
		);
		astroDirector = new AstroDirector(
			new PolyanetBuilder(),
			new SoloonBuilder(),
			new ComethBuilder(),
		);
		megaverseService = new MegaverseService(astroFacadeFactory, astroDirector);
	});

	describe("fixAstro", () => {
		it("Should delete an astro, when goal is SPACE and source has any type", async () => {
			const source: MegaverseMapContentAstro = {
				type: AstroType.SOLOON,
				color: "red",
			};
			const goal: AstroGoal = "SPACE";
			const coords: Coords = { row: 0, column: 1 };
			vi.mocked(soloonsFacade.delete).mockReturnValue(
				new Promise((resolve) => resolve()),
			);

			const result = await megaverseService.fixAstro(source, goal, coords);

			expect(result).toBeUndefined();
		});

		it("Should create an astro, when goal is RED_SOLOON and source.type is not a AstroType.SOLOON", async () => {
			const source: MegaverseMapContentAstro = {
				type: AstroType.POLYANET,
			};
			const goal: AstroGoal = "RED_SOLOON";
			const coords: Coords = { row: 0, column: 1 };
			vi.mocked(soloonsFacade.post).mockReturnValue(
				new Promise((resolve) => resolve()),
			);

			const result = await megaverseService.fixAstro(source, goal, coords);

			expect(result).toBeUndefined();
		});

		it("Should create an astro, when goal is RED_SOLOON and source.type is AstroType.SOLOON and color not red", async () => {
			const source: MegaverseMapContentAstro = {
				type: AstroType.SOLOON,
				color: "blue",
			};
			const goal: AstroGoal = "RED_SOLOON";
			const coords: Coords = { row: 0, column: 1 };
			vi.mocked(soloonsFacade.post).mockReturnValue(
				new Promise((resolve) => resolve()),
			);

			const result = await megaverseService.fixAstro(source, goal, coords);

			expect(result).toBeUndefined();
		});

		it("Should not create nor delete an astro, when goal matches source", async () => {
			const source: MegaverseMapContentAstro = {
				type: AstroType.SOLOON,
				color: "red",
			};
			const goal: AstroGoal = "RED_SOLOON";
			const coords: Coords = { row: 0, column: 1 };

			const result = await megaverseService.fixAstro(source, goal, coords);

			expect(result).toBeNull();
		});
	});
});
