import { env } from "../../lib/env";
import { http } from "../../lib/http";
import type { Coords } from "../../models/interfaces/coords.interface";
import type { ComethDirection } from "../../models/types/cometh-direction.type";
import type { DeleteSoloonDto } from "./dtos/delete-cometh.dto";
import type { PostSoloonDto } from "./dtos/post-cometh.dto";

export const postCometh = (coords: Coords, direction: ComethDirection) => {
	console.log(`Creating ${direction} Cometh at: ${JSON.stringify(coords)}`);
	const body: PostSoloonDto = {
		...coords,
		direction,
		candidateId: env.CANDIDATE_ID,
	};
	return http<void>("/comeths", {
		method: "POST",
		body,
	});
};

export const deleteCometh = (coords: Coords) => {
	console.log(`Deleting Cometh at: ${JSON.stringify(coords)}`);
	const body: DeleteSoloonDto = {
		...coords,
		candidateId: env.CANDIDATE_ID,
	};
	return http<void>("/comeths", {
		method: "DELETE",
		body,
	});
};
