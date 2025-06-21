import { HttpApiClient } from '@effect/platform';
import { BlogApi } from '@ryanbas/blog-api-spec';

export const makeBackendClient = (baseUrl: string) =>
  HttpApiClient.make(BlogApi, { baseUrl });
