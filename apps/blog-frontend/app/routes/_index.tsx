import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { BlogPostCard } from '../components/blog-post-card';
import { getPosts } from '../client/index.js';
import { Effect } from 'effect';

export async function loader() {
  const posts = await Effect.runPromise(getPosts);

  return json({ posts });
}

export default function Index() {
  const { posts } = useLoaderData<typeof loader>();

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
