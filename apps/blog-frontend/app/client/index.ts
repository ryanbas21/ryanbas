import {
  makeBackendClient,
  makeFrontendClient,
} from '@ryanbas/backend-clients';
import { FetchHttpClient } from '@effect/platform';
import { Effect } from 'effect';

const handleClient = Effect.if(typeof window !== 'undefined', {
  onTrue: () => makeFrontendClient(),
  onFalse: () => makeBackendClient(),
});

export const getPostById = (postId: string) =>
  handleClient
    .pipe(
      Effect.flatMap((service) =>
        service.Blog['/blogid']({ path: { id: postId } })
      )
    )
    .pipe(Effect.provide(FetchHttpClient.layer));

export const getPosts = handleClient
  .pipe(Effect.flatMap((service) => service.Blog['/']()))
  .pipe(Effect.provide(FetchHttpClient.layer));
