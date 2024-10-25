// NOTE: As of Node.js 20.12 (and all Node 22.x versions), env files can be loaded programmatically via process.loadEnvFile()
import "dotenv/config";
import { injectable } from "inversify";
import { z } from "zod";

@injectable()
export class Env {
	readonly MEGAVERSE_API_BASE_URL: string;
	readonly CANDIDATE_ID: string;

	constructor() {
		const schema = z.object({
			MEGAVERSE_API_BASE_URL: z.string().min(1),
			CANDIDATE_ID: z.string().min(1),
		});
		const env = schema.safeParse(process.env);
		if (!env.success) {
			throw new Error(`Error loading .env file. ${env.error.message}`);
		}
		Object.assign(this, { ...env.data });
	}
}
