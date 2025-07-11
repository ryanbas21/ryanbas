import { HttpApiClient } from '@effect/platform';
import { BlogApi } from '@ryanbas/blog-api-spec';

export const makeBackendClient = () =>
  HttpApiClient.make(BlogApi, { baseUrl: 'https://localhost/api' });

export const makeFrontendClient = () =>
  HttpApiClient.make(BlogApi, { baseUrl: '/api' });
