import {
  HttpApi,
  HttpApiGroup,
  HttpApiEndpoint,
  HttpApiError,
  OpenApi,
  HttpApiSchema,
} from '@effect/platform';
import { Schema } from 'effect';
import { ContentfulItemsOnly, SingleEntrySchema } from '@ryanbas/blog-schemas';

const idParam = HttpApiSchema.param('id', Schema.String);

export const BlogApi = HttpApi.make('BlogApi').add(
  HttpApiGroup.make('Blog')
    .annotate(OpenApi.Description, 'Blog API')
    .add(
      HttpApiEndpoint.get('/')`/`
        .addSuccess(ContentfulItemsOnly)
        .addError(HttpApiError.NotFound)
        .annotate(OpenApi.Description, 'Get all blog entries')
    )
    .add(
      HttpApiEndpoint.get('/blogid')`/${idParam}`
        .setPath(Schema.Struct({ id: Schema.String }))
        .addSuccess(SingleEntrySchema)
        .addError(HttpApiError.NotFound)
        .annotate(OpenApi.Description, 'Get a single blog entries')
    )
);
