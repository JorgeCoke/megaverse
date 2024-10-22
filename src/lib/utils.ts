import type { Coords } from "../models/interfaces/coords.interface";

export const sleep = (ms: number) =>
	new Promise((resolve) => setTimeout(() => resolve(null), ms));

export const extractXShapeCoordsFromMatrix = (
	matrix: unknown[][],
	marginCells: number,
): Coords[] => {
	const result: Coords[] = [];
	const width = matrix[0].length; // Number of columns
	const height = matrix.length; // Number of rows
	if (marginCells < 0) {
		throw new Error("marginCells must be greater or equal to 0");
	}
	if (!(height % 2) || !(width % 2)) {
		throw new Error("Width and height must be add");
	}
	if (matrix.some((e) => e.length !== width)) {
		throw new Error("All rows must have same length");
	}
	if (height < 3 + marginCells * 2 || width < 3 + marginCells * 2) {
		throw new Error(
			"Width and height should have at least 3 cells after removing margins",
		);
	}

	const center: Coords = {
		row: Math.round(height / 2) - 1,
		column: Math.round(width / 2) - 1,
	};
	result.push(center);

	const Xlength = (Math.min(width, height) - marginCells * 2 - 1) / 2; // Substract cells for margins and center
	for (let i = 1; i <= Xlength; i++) {
		result.push({ row: center.row - i, column: center.column - i });
		result.push({ row: center.row + i, column: center.column + i });
		result.push({ row: center.row - i, column: center.column + i });
		result.push({ row: center.row + i, column: center.column - i });
	}

	return result;
};
