import { inject, injectable } from "inversify";
import { Env } from "../../lib/env";
import { Http } from "../../lib/http";
import type { GetMegaverseMapGoalDto } from "./dtos/get-megaverse-map-goal.dto";
import type { GetMegaverseMapDto } from "./dtos/get-megaverse-map.dto";

@injectable()
export class MegaverseFacade {
	constructor(
		@inject(Env) private readonly env: Env,
		@inject(Http) private readonly http: Http,
	) {}

	public getMegaverseMapGoal() {
		return this.http.megaverse<GetMegaverseMapGoalDto>(
			`/map/${this.env.CANDIDATE_ID}/goal`,
		);
	}

	public getMegaverseMap() {
		return this.http.megaverse<GetMegaverseMapDto>(
			`/map/${this.env.CANDIDATE_ID}`,
		);
	}
}
