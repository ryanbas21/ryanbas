import {
  HttpClient,
  HttpClientRequest,
  HttpClientResponse,
} from '@effect/platform';
import { Effect, Context, Config, Layer, Console } from 'effect';
import { NotFound } from '@effect/platform/HttpApiError';
import {
  SingleEntrySchema,
  SingleEntry,
  ContentfulItemsOnly,
  ContentfulEntriesResponseSchema,
} from '@ryanbas/blog-schemas';

interface ContentfulApi {
  getAllPosts: Effect.Effect<ContentfulItemsOnly, NotFound, never>;
  getPost: (id: string) => Effect.Effect<SingleEntry, NotFound, never>;
}

class Contentful extends Context.Tag('services/Contentful')<
  Contentful,
  ContentfulApi
>() {}

const ContentfulLive = Layer.effect(
  Contentful,
  Effect.gen(function* () {
    const client = (yield* HttpClient.HttpClient).pipe(
      HttpClient.tapRequest(Console.log)
    );
    const space_id = yield* Config.string('CONTENTFUL_SPACE_ID');
    const access_token = yield* Config.string('CONTENTFUL_API_KEY');
    const environment = yield* Config.string('CONTENTFUL_ENVIRONMENT').pipe(
      Config.withDefault('master')
    );

    const baseRequest = HttpClientRequest.get(
      'https://cdn.contentful.com'
    ).pipe(HttpClientRequest.setUrlParam('access_token', access_token));

    return {
      getPost: (id) =>
        baseRequest.pipe(
          HttpClientRequest.appendUrl(
            `/spaces/${space_id}/environments/${environment}/entries/${id}`
          ),
          client.execute,
          Effect.flatMap(HttpClientResponse.schemaBodyJson(SingleEntrySchema)),
          Effect.catchTags({
            ParseError: (e) => {
              console.log(e);
              return Effect.fail(new NotFound());
            },
            RequestError: () => Effect.fail(new NotFound()),
            ResponseError: () => Effect.fail(new NotFound()),
          })
        ),
      getAllPosts: baseRequest.pipe(
        HttpClientRequest.appendUrl(
          `/spaces/${space_id}/environments/${environment}/entries`
        ),
        client.execute,
        Effect.flatMap(
          HttpClientResponse.schemaBodyJson(ContentfulEntriesResponseSchema)
        ),
        Effect.tap(Console.log),
        Effect.map((response) =>
          response.items.map((post) => ({
            subHeader: post.fields.subHeader,
            tags: post.fields.tags,
            title: post.fields.title,
            id: post.sys.id,
          }))
        ),
        Effect.tap(Console.log),
        Effect.catchTags({
          ParseError: (e) => {
            console.log(e);
            return Effect.fail(new NotFound());
          },
          RequestError: (e) => {
            console.log(e);
            return Effect.fail(new NotFound());
          },
          ResponseError: (e) => {
            console.log(e);
            return Effect.fail(new NotFound());
          },
        })
      ),
    };
  })
);

export { Contentful, ContentfulLive, type ContentfulApi };
