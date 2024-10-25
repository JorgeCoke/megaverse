import { injectable } from "inversify";
import type { PostSoloonDto } from "./dtos/post-soloon.dto";
import type { Soloon } from "../../../../models/classes/soloon.class";
import { AstroFacade } from "../../astro.facade";
@injectable()
export class SoloonsFacade extends AstroFacade<Soloon> {
	protected readonly baseUrl = "/soloons";

	post(entity: Soloon) {
		const body: PostSoloonDto = {
			...entity.coords,
			color: entity.color,
			candidateId: this.env.CANDIDATE_ID,
		};
		console.log(
			`Creating ${this.baseUrl} ${entity.color} at: ${JSON.stringify(
				entity.coords,
			)}`,
		);
		return this.http.megaverse<void>(this.baseUrl, {
			method: "POST",
			body,
		});
	}
}
