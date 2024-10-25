import { inject, injectable } from "inversify";
import { Env } from "../../lib/env";
import { Http } from "../../lib/http";
import type { Astro } from "../../models/classes/astro.class";
import type { Coords } from "../../models/types/coords.type";
import type { DeleteAstroDto } from "./dtos/delete-astro.dto";

@injectable()
export abstract class AstroFacade<T extends Astro<unknown>> {
	protected abstract baseUrl: string;
	abstract post(entity: T): Promise<void>;

	constructor(
		@inject(Env) protected readonly env: Env,
		@inject(Http) protected readonly http: Http,
	) {}

	delete(coords: Coords) {
		console.log(`Deleting astro ${this.baseUrl} at: ${JSON.stringify(coords)}`);
		const body: DeleteAstroDto = {
			...coords,
			candidateId: this.env.CANDIDATE_ID,
		};
		return this.http.megaverse<void>(this.baseUrl, {
			method: "DELETE",
			body,
		});
	}
}
