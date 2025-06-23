/* eslint-disable @typescript-eslint/no-empty-object-type */
 
import { Schema } from 'effect';

const sysLinkSchema = Schema.Struct({
  type: Schema.String,
  linkType: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
});

const entryMetadataSchema = Schema.Struct({
  tags: Schema.Array(Schema.Unknown),
  concepts: Schema.Array(Schema.Unknown),
});

const textMarkSchema = Schema.Struct({
  type: Schema.String,
});

const textNodeSchema = Schema.Struct({
  nodeType: Schema.Literal('text'),
  value: Schema.String,
  marks: Schema.Array(textMarkSchema),
  data: Schema.Record({ key: Schema.String, value: Schema.Unknown }),
});

// Improved paragraphNodeSchema to handle the recursive nature better
const paragraphNodeSchema = Schema.Struct({
  nodeType: Schema.Union(
    Schema.Literal('paragraph'),
    Schema.Literal('heading-2'),
    Schema.Literal('hr')
  ),
  content: Schema.optional(
    Schema.Array(
      Schema.Union(
        textNodeSchema,
        Schema.Struct({
          nodeType: Schema.String,
          value: Schema.String,
          marks: Schema.Array(textMarkSchema),
          data: Schema.Record({ key: Schema.String, value: Schema.Unknown }),
        })
      )
    )
  ), // Made optional since 'hr' nodes don't have content
  data: Schema.Record({ key: Schema.String, value: Schema.Unknown }),
});

const richTextSchema = Schema.Struct({
  nodeType: Schema.Literal('document'),
  data: Schema.Record({ key: Schema.String, value: Schema.Unknown }),
  content: Schema.Array(paragraphNodeSchema),
});

// Fixed: Made text field optional since not all entries have it
const entryFieldsSchema = Schema.Struct({
  title: Schema.String,
  subHeader: Schema.String,
  tags: Schema.String,
  text: Schema.optional(
    Schema.Record({ key: Schema.String, value: Schema.Any })
  ),
});

// Your main entry schema works well, just a small improvement to make publishedVersion required
// since it appears in your data
const entrySchema = Schema.Struct({
  metadata: Schema.optional(entryMetadataSchema),
  sys: Schema.Struct({
    space: Schema.Struct({
      sys: sysLinkSchema,
    }),
    id: Schema.String,
    type: Schema.String,
    createdAt: Schema.String,
    updatedAt: Schema.String,
    environment: Schema.Struct({
      sys: sysLinkSchema,
    }),
    publishedVersion: Schema.Number, // Made required since it's in your data
    revision: Schema.Number, // Made required since it's in your data
    contentType: Schema.Struct({
      sys: sysLinkSchema,
    }),
    locale: Schema.String, // Made required since it's in your data
  }),
  fields: entryFieldsSchema,
});

// Your blog-specific schema is great for when you need type safety
const blogEntryFieldsSchema = Schema.Struct({
  title: Schema.String,
  subHeader: Schema.String,
  tags: Schema.String,
  text: richTextSchema,
});

const blogEntrySchema = Schema.Struct({
  metadata: entryMetadataSchema, // Made required to match your data
  sys: Schema.Struct({
    space: Schema.Struct({
      sys: sysLinkSchema,
    }),
    id: Schema.String,
    type: Schema.String,
    createdAt: Schema.String,
    updatedAt: Schema.String,
    environment: Schema.Struct({
      sys: sysLinkSchema,
    }),
    publishedVersion: Schema.Number,
    revision: Schema.Number,
    contentType: Schema.Struct({
      sys: sysLinkSchema,
    }),
    locale: Schema.String,
  }),
  fields: blogEntryFieldsSchema,
});

// For single entry responses (like your JSON data)
const SingleEntrySchema = blogEntrySchema;

// Your existing response schema for collections
const ContentfulEntriesResponseSchema = Schema.Struct({
  sys: sysLinkSchema,
  includes: Schema.optional(
    Schema.Record({ key: Schema.String, value: Schema.Unknown })
  ),
  total: Schema.Number,
  skip: Schema.Number,
  limit: Schema.Number,
  items: Schema.Array(entrySchema),
  errors: Schema.optional(Schema.Array(Schema.Unknown)),
});

export const ContentfulItemsOnly_ = Schema.Array(
  Schema.Struct({
    title: Schema.String,
    subHeader: Schema.String,
    tags: Schema.String,
    id: Schema.String,
  })
);

export const ContentfulItemsOnly: Schema.Schema<
  ContentfulItemsOnly,
  ContentfulItemsOnly_Encoded,
  ContentfulItemsOnly_Context
> = ContentfulItemsOnly_;
export type ContentfulItemsOnly_Context = Schema.Schema.Context<
  typeof ContentfulItemsOnly_
>;
export interface ContentfulItemsOnly_Encoded
  extends Schema.Schema.Encoded<typeof ContentfulItemsOnly_> {}
export interface ContentfulItemsOnly
  extends Schema.Schema.Type<typeof ContentfulItemsOnly_> {}

// Other type aliases
export type ContentfulEntriesResponse = Schema.Schema.Type<
  typeof ContentfulEntriesResponseSchema
>;
export type BlogEntry = Schema.Schema.Type<typeof blogEntrySchema>;
export type SingleEntry = Schema.Schema.Type<typeof SingleEntrySchema>;

// Export schemas and types (REMOVED ContentfulItemsOnly from here since it's already exported above)
export {
  entrySchema,
  blogEntrySchema,
  SingleEntrySchema,
  ContentfulEntriesResponseSchema,
};
