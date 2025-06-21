import {
  // makeBackendClient,
  makeFrontendClient,
} from '@ryanbas/backend-clients';
import { FetchHttpClient } from '@effect/platform';
import { Console, Effect } from 'effect';

export const client = makeFrontendClient();

export const getPostById = (postId: string) =>
  client
    .pipe(
      Effect.tap(Console.log('Making Request on backend')),
      Effect.flatMap((service) =>
        service.Blog['/blogid']({ path: { id: postId } })
      )
    )
    .pipe(Effect.provide(FetchHttpClient.layer));

export const getPosts = client
  .pipe(Effect.flatMap((service) => service.Blog['/']()))
  .pipe(Effect.provide(FetchHttpClient.layer));
