import { ofetch } from "ofetch";
import { Env } from "./env";
import { inject, injectable } from "inversify";

// For PUT, PATCH, and POST request methods, when a string or object body is set,
// ofetch adds the default content-type: "application/json" and accept: "application/json".
// ofetch Automatically retries the request (3 times) if an error happens
@injectable()
export class Http {
	public readonly megaverse = ofetch.create({
		baseURL: this.env.MEGAVERSE_API_BASE_URL,
		retry: 5,
		retryDelay: 5000, // ms
		timeout: 30000, // ms
	});

	constructor(@inject(Env) private readonly env: Env) {}
}
