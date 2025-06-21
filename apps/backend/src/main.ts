import { HttpApiBuilder, HttpApiSwagger, HttpServer } from '@effect/platform';
import { NodeHttpServer, NodeRuntime } from '@effect/platform-node';
import { Layer } from 'effect';
import { NodeHttpClient } from '@effect/platform-node';
import { createServer } from 'node:http';
import { BlogsLive } from './routes/blogs/blogs.js';
import { BlogApi } from '@ryanbas/blog-api-spec';
import { ContentfulLive } from './services/contentful.js';
import { NodeSdk } from '@effect/opentelemetry';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-node';

const NodeSDKTracerLive = NodeSdk.layer(() => ({
  resource: { serviceName: 'BlogService' },
  spanProcessor: new BatchSpanProcessor(new OTLPTraceExporter()),
}));

const MyApiLive = HttpApiBuilder.api(BlogApi).pipe(
  Layer.provide(BlogsLive),
  Layer.provide(ContentfulLive)
);

const ServerLive = HttpApiBuilder.serve().pipe(
  Layer.provide(
    HttpApiBuilder.middlewareCors({
      allowedOrigins: ['*'],
      allowedMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      maxAge: 3600,
    })
  ),
  Layer.provide(HttpApiSwagger.layer()),
  Layer.provide(MyApiLive),
  Layer.provide(NodeSDKTracerLive),
  Layer.provide(NodeHttpClient.layer),
  HttpServer.withLogAddress,
  Layer.provide(NodeHttpServer.layer(createServer, { port: 8443 }))
);

// Launch the server
Layer.launch(ServerLive).pipe(NodeRuntime.runMain);
