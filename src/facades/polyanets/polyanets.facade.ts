import { env } from "../../lib/env";
import { http } from "../../lib/http";
import type { Coords } from "../../models/interfaces/coords.interface";
import type { DeletePolyanetDto } from "./dtos/delete-polyanet.dto";
import type { PostPolyanetDto } from "./dtos/post-polyanet.dto";

export const postPolyanet = (coords: Coords) => {
	console.log(`Creating Polyanet at: ${JSON.stringify(coords)}`);
	const body: PostPolyanetDto = {
		...coords,
		candidateId: env.CANDIDATE_ID,
	};
	return http<void>("/polyanets", {
		method: "POST",
		body,
	});
};

export const deletePolyanet = (coords: Coords) => {
	console.log(`Deleting Polyanet at: ${JSON.stringify(coords)}`);
	const body: DeletePolyanetDto = {
		...coords,
		candidateId: env.CANDIDATE_ID,
	};
	return http<void>("/polyanets", {
		method: "DELETE",
		body,
	});
};
