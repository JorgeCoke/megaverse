# Megaverse

## 🛠 Getting Started

First, create your .env file, and then run the corresponding challenge script as follows:

```
cp .env.example .env    # Create a .env file and don't forget to fill your candidateId variable
npm run phase1          # Executes phase1.ts script
npm run phase2          # Executes phase2.ts script
npm run format          # Run Biome formatter
npm run build           # Build source files
```

## 1️⃣ Phase 1

Based on the challenge description, my initial approach for Phase 1 was to develop a method to calculate and extract coordinates from a matrix that would form an "X" shape at its center. To achieve this, I created the "extractXShapeCoordsFromMatrix" method. (I later discovered in Phase 2 that this wasn't the correct solution though 🥹)

While analyzing the challenge, I noticed that the three types of objects (Polyanets, Soloons, and Comeths) shared some common parameters and functionalities. This led me to design a generic Astro class that could be extended by the other specific astro types, simplifying code reusability. As part of this solution, I developed two helpful methods:

- fillMegaverseMapRandomly: which populates the megaverse with random astros (just for testing purposes).
- clearMegaverseMap: which removes all astros found in the megaverse.

With these tools, the solution implemented in "phase1.ts" file is straightforward:

- First, clear the map using "clearMegaverseMap"
- Then extract the coordinates for the "X" shape using "extractXShapeCoordsFromMatrix"
- And finally, create the Polyanets at those positions.

The main problem of this approach is that during the initial clearing step, we might end up deleting cells that are already correct, only to recreate them later. While this could be optimized to avoid unnecessary deletions, I chose to leave it as-is for now because, as mentioned earlier, the solution developed for Phase 2 addresses this issue effectively and remains compatible with Phase 1.

## 2️⃣ Phase 2

In this phase, my initial priority was to develop a working solution quickly (because the phase 1 solution was not useful), with the idea to implement a extensive refactor later. Refactoring is a critical part of the development process and happens frequently, so I adopted this approach to address the challenge. Again, the solution was straightforward:

- Retrieve the Goal Map from the API.
- Fetch the Current Map from the API.
- Compare each cell between the two maps, and update any cells that don't match the goal.
- Done!

During Phase 2, I also developed facades for the Soloon and Cometh entities. Since the facades were quite similar, I implemented a generic Factory Pattern. This approach allows us to easily add or remove different astro types in the future by simply creating a new facade that implements the generic AstroFacade. The system only needs to identify which astro type is being used (Polyanet, Soloon, or Cometh).

Even though each astro currently has only a few parameters, I implemented a Builder Pattern with a Director to create astro objects easly. While this might be a bit of over-engineering for the current requirements, it could be useful if the number of parameters for each astro increases in the future (mass, gravity, magnetic field...).

Additionally, an Inversion of Control (IoC) library for dependency injection is essential for any scalable project. For this reason, I integrated "InversifyJS," a widely-used tool in such scenarios. It simplifies the process of injecting dependencies into each service, making the architecture cleaner and more maintainable.

## 📝 NOTES

Initially, my approach was to use Promise.allSettled to send multiple API requests in parallel, in order to improve performance. However, the API had strict rate limits and often returned a 429 (Too Many Requests) error. In some cases, it even responded with a 200 status code but still failed to process the requests correctly (?¿). Trying to fix this, I implemented a chunking mechanism that limited parallel requests to about 5 at a time, but the API continued to deny my calls. Ultimately, I could have used a sleep function to introduce delays between requests, but the retry mechanism introduced with "ofetch" was working fine, so I decided to go with this approach. Another alternative could have been implementing a debounce queue, but I opted to keep things simpler for now.

For handling HTTP requests, I chose to use ofetch, which makes it easy to set up timeouts and retry mechanisms. This way, we can automatically retry failed requests with minimal configuration. The timeout is configured to ensure that requests wait long enough to bypass any rate limiting errors.

Type safety is crucial for me, and that's why I avoid using any in all my projects, and so I did. TypeScript's type-checking capabilities are essential, and every parameter in this challenge is properly typed.

I believe that code should be self-explanatory, minimizing the need for unnecessary comments. Therefore, I focused on commenting the more complex methods in this challenge while avoiding comments on those that I felt were straightforward and did not require additional explanations. Regarding the "fixAstro" method, I agree that it's quite long, but its logic needs to be consolidated in one place. In this case, I chose to keep all the functionality within a single method rather than splitting it across multiple files.

Additionally, I discovered that the challenge documentation at [https://challenge.crossmint.com/documentation](https://challenge.crossmint.com/documentation) is accessible without a candidateId. By disabling JavaScript in the browser, the page is accesible. It seems some validation is performed on the client side after the view is rendered (?¿)
