import { Env } from "../../lib/env";
import { Http } from "../../lib/http";
import { AstroType } from "../../models/enum/astro-type.enum";
import type { Coords } from "../../models/types/coords.type";
import { AstroFacadeFactory } from "./astro-facade.factory";
import { ComethsFacade } from "./factory/comeths/comeths.facade";
import { PolyanetsFacade } from "./factory/polyanets/polyanets.facade";
import { SoloonsFacade } from "./factory/soloons/soloons.facade";

vi.mock("./factory/polyanets/polyanets.facade");
vi.mock("./factory/soloons/soloons.facade");
vi.mock("./factory/comeths/comeths.facade");

describe("AstroFacadeFactory", () => {
	let astroFacadeFactory: AstroFacadeFactory;
	let polyanetFacade: PolyanetsFacade;
	let soloonFacade: SoloonsFacade;
	let comethFacade: ComethsFacade;

	beforeEach(() => {
		const env = new Env();
		const http = new Http(env);
		polyanetFacade = new PolyanetsFacade(env, http);
		soloonFacade = new SoloonsFacade(env, http);
		comethFacade = new ComethsFacade(env, http);

		astroFacadeFactory = new AstroFacadeFactory(
			polyanetFacade,
			soloonFacade,
			comethFacade,
		);
	});

	it("Should return a PolyanetFacade, when AstroType.POLYANET is used", async () => {
		vi.mocked(polyanetFacade.delete).mockReturnValue(undefined);

		const coords: Coords = { row: 0, column: 1 };
		const facade = astroFacadeFactory.getFacade(AstroType.POLYANET);
		await facade.delete(coords);

		expect(facade).toBeInstanceOf(PolyanetsFacade);
	});

	it("Should return a SoloonFacade, when AstroType.SOLOON is used", async () => {
		vi.mocked(soloonFacade.delete).mockReturnValue(undefined);

		const coords: Coords = { row: 0, column: 1 };
		const facade = astroFacadeFactory.getFacade(AstroType.SOLOON);
		await facade.delete(coords);

		expect(facade).toBeInstanceOf(SoloonsFacade);
	});

	it("Should return a ComethFacade, when AstroType.COMETH is used", async () => {
		vi.mocked(comethFacade.delete).mockReturnValue(undefined);

		const coords: Coords = { row: 0, column: 1 };
		const facade = astroFacadeFactory.getFacade(AstroType.COMETH);
		await facade.delete(coords);

		expect(facade).toBeInstanceOf(ComethsFacade);
	});
});
