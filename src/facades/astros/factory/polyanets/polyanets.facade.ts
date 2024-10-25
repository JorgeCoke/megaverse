import { injectable } from "inversify";
import type { PostPolyanetDto } from "./dtos/post-polyanet.dto";
import type { Polyanet } from "../../../../models/classes/polyanet.class";
import { AstroFacade } from "../../astro.facade";
@injectable()
export class PolyanetsFacade extends AstroFacade<Polyanet> {
	protected readonly baseUrl = "/polyanets";

	post(entity: Polyanet) {
		const body: PostPolyanetDto = {
			...entity.coords,
			candidateId: this.env.CANDIDATE_ID,
		};
		console.log(
			`Creating ${this.baseUrl} at: ${JSON.stringify(entity.coords)}`,
		);
		return this.http.megaverse<void>(this.baseUrl, {
			method: "POST",
			body,
		});
	}
}
