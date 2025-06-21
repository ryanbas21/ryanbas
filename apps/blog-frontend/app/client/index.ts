import { makeBackendClient } from '@ryanbas/backend-clients';
import { FetchHttpClient, HttpApi, HttpClientResponse } from '@effect/platform';
import { Effect } from 'effect';
import { service } from 'effect/Layer';

export const client = makeBackendClient('http://localhost:3000');

export const getPostById = (postId: string) =>
  Effect.runPromise(
    client
      .pipe(
        Effect.flatMap((service) =>
          service.Blog['/blogid']({ path: { id: postId } })
        )
      )
      .pipe(Effect.provide(FetchHttpClient.layer))
  );

export const getPosts = client
  .pipe(Effect.flatMap((service) => service.Blog['/']()))
  .pipe(Effect.provide(FetchHttpClient.layer));
