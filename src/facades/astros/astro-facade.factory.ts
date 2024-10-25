import { inject, injectable } from "inversify";
import { AstroType } from "../../models/enum/astro-type.enum";
import { PolyanetsFacade } from "./factory/polyanets/polyanets.facade";
import { SoloonsFacade } from "./factory/soloons/soloons.facade";
import { ComethsFacade } from "./factory/comeths/comeths.facade";

@injectable()
export class AstroFacadeFactory {
	constructor(
		@inject(PolyanetsFacade) private readonly polyanetsFacade: PolyanetsFacade,
		@inject(SoloonsFacade) private readonly soloonsFacade: SoloonsFacade,
		@inject(ComethsFacade) private readonly comethsFacade: ComethsFacade,
	) {}

	// Typescript is not recognizing the types inside switch or if statements, add function overload here for type-safety
	getFacade(value: AstroType.POLYANET): PolyanetsFacade;
	getFacade(value: AstroType.SOLOON): SoloonsFacade;
	getFacade(value: AstroType.COMETH): ComethsFacade;
	getFacade(value: AstroType): PolyanetsFacade | SoloonsFacade | ComethsFacade;

	getFacade(type: AstroType) {
		if (type === AstroType.POLYANET) {
			return this.polyanetsFacade;
		}
		if (type === AstroType.SOLOON) {
			return this.soloonsFacade;
		}
		if (type === AstroType.COMETH) {
			return this.comethsFacade;
		}
		throw new Error(`Error. Unknown astro type: ${type}`);
	}
}
