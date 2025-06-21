import { json, type LoaderFunctionArgs } from '@remix-run/node';
import { getPostById } from '../client/index.js';
import { useLoaderData } from '@remix-run/react';
import { TagList } from '../components/tag-list';
import { formatDate } from '../utils/date.js';

export async function loader({ params }: LoaderFunctionArgs) {
  const postId = params.id;

  if (!postId) {
    throw new Response('Post ID is required', { status: 400 });
  }

  const post = await getPostById(postId);

  if (!post) {
    throw new Response('Post not found', { status: 404 });
  }

  return json({ post });
}

export default function BlogPost() {
  const { post } = useLoaderData<typeof loader>();

  return (
    <article className="prose dark:prose-invert max-w-none">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{post.fields.title}</h1>
        <time className="text-sm text-gray-500 dark:text-gray-400 block mb-4">
          {formatDate(post.fields.subHeader)}
        </time>
        <TagList tags={post.fields.tags} />
      </header>

      <div
        className="mt-8"
        dangerouslySetInnerHTML={{ __html: post.fields.text }}
      />
    </article>
  );
}
