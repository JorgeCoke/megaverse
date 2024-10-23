import { env } from "../../lib/env";
import { http } from "../../lib/http";
import { sleep } from "../../lib/utils";
import { CellType } from "../../models/enum/cell-type.enum";
import { deleteCometh, postCometh } from "../comeths/comeths.facade";
import { deletePolyanet, postPolyanet } from "../polyanets/polyanets.facade";
import { deleteSoloon, postSoloon } from "../soloons/soloons.facade";
import type { GetMegaverseMapGoalDto } from "./dtos/get-megaverse-map-goal.dto";
import type {
	GetMegaverseMapDto,
	MegaverseMap,
} from "./dtos/get-megaverse-map.dto";

export const getMegaverseMapGoal = () =>
	http<GetMegaverseMapGoalDto>(`/map/${env.CANDIDATE_ID}/goal`);

export const getMegaverseMap = () =>
	http<GetMegaverseMapDto>(`/map/${env.CANDIDATE_ID}`);
