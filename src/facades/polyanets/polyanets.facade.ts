import { env } from "../../lib/env";
import { http } from "../../lib/http";
import type { Coords } from "../../models/interfaces/coords.interface";
import type { DeletePolyanetDto } from "./dtos/delete-polyanet.dto";
import type { PostPolyanetDto } from "./dtos/post-polyanet.dto";

export const postPolyanet = (coords: Coords) => {
	const body: PostPolyanetDto = {
		...coords,
		candidateId: env.CANDIDATE_ID,
	};
	// TODO: Add response types
	return http("/polyanets", {
		method: "POST",
		body,
	});
};

export const deletePolyanet = (coords: Coords) => {
	const body: DeletePolyanetDto = {
		...coords,
		candidateId: env.CANDIDATE_ID,
	};
	// TODO: Add response types
	return http("/polyanets", {
		method: "DELETE",
		body,
	});
};
