import { HttpApiBuilder, HttpApiError } from '@effect/platform';
import { Effect } from 'effect';
import { BlogApi } from '@ryanbas/blog-api-spec';
import { Contentful } from '../../services/contentful.js';

const BlogsLive = HttpApiBuilder.group(BlogApi, 'Blog', (handlers) =>
  handlers
    .handle('/', () =>
      Contentful.pipe(
        Effect.flatMap((client) => client.getAllPosts),
        Effect.catchTag('NotFound', () =>
          Effect.fail(new HttpApiError.NotFound())
        ),
        Effect.withSpan('GetAllBlogs')
      )
    )
    .handle('/blogid', (req) =>
      Contentful.pipe(
        Effect.flatMap((client) => client.getPost(req.path.id)),
        Effect.withSpan('GetBlogById')
      )
    )
);

export { BlogsLive };
