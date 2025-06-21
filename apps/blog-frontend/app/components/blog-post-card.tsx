import { Link } from '@remix-run/react';
import { formatDate } from '../utils/date.js';
import { TagList } from './tag-list.js';

type Post = {
  id: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  tags: Array<{ id: string; name: string }>;
};

interface BlogPostCardProps {
  post: Post;
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <article className="border-b border-gray-200 dark:border-gray-700 pb-6">
      <time className="text-sm text-gray-500 dark:text-gray-400 block mb-2">
        {formatDate(post.publishedAt)}
      </time>
      <h3 className="text-xl font-semibold mb-2">
        <Link
          to={`/blog/${post.id}`}
          className="hover:text-gray-600 dark:hover:text-gray-300 transition"
        >
          {post.title}
        </Link>
      </h3>
      <p className="text-gray-700 dark:text-gray-300 mb-4">{post.excerpt}</p>
      <TagList tags={post.tags} />
    </article>
  );
}
