type GoalSpaceAstro = "SPACE";
type GoalPolyanetAstro = "POLYANET";
type GoalComethAstro =
	| "UP_COMETH"
	| "LEFT_COMETH"
	| "RIGHT_COMETH"
	| "DOWN_COMETH";
type GoalSoloonAstro =
	| "WHITE_SOLOON"
	| "RED_SOLOON"
	| "BLUE_SOLOON"
	| "PURPLE_SOLOON";

export type AstroGoal =
	| GoalSpaceAstro
	| GoalPolyanetAstro
	| GoalComethAstro
	| GoalSoloonAstro;

export type GetMegaverseMapGoalDto = {
	goal: AstroGoal[][];
};
