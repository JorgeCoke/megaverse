type GoalSpaceCell = "SPACE";
type GoalPolyanetCell = "POLYANET";
type GoalComethCell =
	| "UP_COMETH"
	| "LEFT_COMETH"
	| "RIGHT_COMETH"
	| "DOWN_COMETH";
type GoalSoloonCell =
	| "WHITE_SOLOON"
	| "RED_SOLOON"
	| "BLUE_SOLOON"
	| "PURPLE_SOLOON";

export type CellGoal =
	| GoalSpaceCell
	| GoalPolyanetCell
	| GoalComethCell
	| GoalSoloonCell;

export type GetMegaverseMapGoalDto = {
	goal: CellGoal[][];
};
