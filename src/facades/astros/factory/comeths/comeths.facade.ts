import { injectable } from "inversify";
import type { PostComethDto } from "./dtos/post-cometh.dto";
import type { Cometh } from "../../../../models/classes/cometh.class";
import { AstroFacade } from "../../astro.facade";

@injectable()
export class ComethsFacade extends AstroFacade<Cometh> {
	protected readonly baseUrl = "/comeths";

	post(entity: Cometh) {
		const body: PostComethDto = {
			...entity.coords,
			direction: entity.direction,
			candidateId: this.env.CANDIDATE_ID,
		};
		console.log(
			`Creating ${this.baseUrl} ${entity.direction} at: ${JSON.stringify(
				entity.coords,
			)}`,
		);
		return this.http.megaverse<void>(this.baseUrl, {
			method: "POST",
			body,
		});
	}
}
