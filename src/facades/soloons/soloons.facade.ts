import { env } from "../../lib/env";
import { http } from "../../lib/http";
import type { Coords } from "../../models/interfaces/coords.interface";
import type { SoloonColor } from "../../models/types/soloon-color.type";
import type { DeleteSoloonDto } from "./dtos/delete-soloon.dto";
import type { PostSoloonDto } from "./dtos/post-soloon.dto";

export const postSoloon = (coords: Coords, color: SoloonColor) => {
	console.log(`Creating ${color} Soloon at: ${JSON.stringify(coords)}`);
	const body: PostSoloonDto = {
		...coords,
		color,
		candidateId: env.CANDIDATE_ID,
	};
	return http<void>("/soloons", {
		method: "POST",
		body,
	});
};

export const deleteSoloon = (coords: Coords) => {
	console.log(`Deleting Soloon at: ${JSON.stringify(coords)}`);
	const body: DeleteSoloonDto = {
		...coords,
		candidateId: env.CANDIDATE_ID,
	};
	return http<void>("/soloons", {
		method: "DELETE",
		body,
	});
};
