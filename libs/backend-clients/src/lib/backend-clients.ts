import { HttpApiClient } from '@effect/platform';
import { BlogApi } from '@ryanbas/blog-api-spec';
import { Console, Effect, pipe } from 'effect';

export const makeBackendClient = () =>
  pipe(
    HttpApiClient.make(BlogApi, { baseUrl: 'http://localhost:9443' }),
    Effect.tap(Console.log)
  );

export const makeFrontendClient = () =>
  HttpApiClient.make(BlogApi, { baseUrl: 'http://localhost:9443' });
