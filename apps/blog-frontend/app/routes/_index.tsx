import { useLoaderData } from '@remix-run/react';
import { BlogPostCard } from '../components/blog-post-card';
import { getPosts } from '../client/index.js';
import { Effect } from 'effect';
import { ContentfulItemsOnly } from '@ryanbas/blog-schemas';

export const loader = () => Effect.runPromise(getPosts);

export default function Index() {
  const posts = useLoaderData<ContentfulItemsOnly>();

  return (
    <div>
      <section>
        <h2 className="text-2xl font-semibold mb-6">Latest Posts</h2>
        <div className="space-y-8">
          {posts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
