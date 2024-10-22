import {
	clearMegaverseMap,
	getMegaverseMap,
} from "./facades/megaverse/megaverse.facade";
import { postPolyanet } from "./facades/polyanets/polyanets.facade";
import { extractXShapeCoordsFromMatrix, sleep } from "./lib/utils";

const buildPolynetMegaverse = async () => {
	// Get current MegaverseMap
	console.log("Getting metaverse map...");
	const response = await getMegaverseMap();

	// // Fill MegaverseMap with random Polynets for testing purposes
	// console.log("Filling metaverse map randomly...");
	// await fillMegaverseMap(response.map);

	// Clear MegaverseMap
	console.log("Clearing metaverse map...");
	await clearMegaverseMap(response.map);

	// Get X shape coords
	console.log("Getting X shape coords...");
	const XShapeCoords = extractXShapeCoordsFromMatrix(response.map.content, 2);

	// Create Polynets
	console.log("Running queries...");
	for (const coords of XShapeCoords) {
		await postPolyanet(coords);
		await sleep(1000);
	}

	console.log("Done! ✅");
};

buildPolynetMegaverse();
