import { Link } from '@remix-run/react';
import { formatDate } from '../utils/date.js';
import { TagList } from './tag-list.js';

type Post = {
  id: string;
  title: string;
  subHeader: string;
  tags: string;
};

interface BlogPostCardProps {
  post: Post;
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <article className="group relative bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 transition-all duration-300 hover:shadow-xl hover:shadow-gray-100/50 dark:hover:shadow-gray-900/50 hover:-translate-y-1">
      {/* Gradient background overlay on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Content container */}
      <div className="relative z-10">
        {/* Date with modern styling */}
        <time className="inline-flex items-center px-3 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
          {formatDate(post.subHeader)}
        </time>

        {/* Title with improved typography */}
        <h3 className="text-2xl font-bold mb-4 leading-tight">
          <Link
            to={`/blog/${post.id}`}
            className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent hover:from-blue-600 hover:to-purple-600 dark:hover:from-blue-400 dark:hover:to-purple-400 transition-all duration-300"
          >
            {post.title}
          </Link>
        </h3>

        {/* Tags with modern styling */}
        <TagList tags={post.tags} />

        {/* Subtle arrow indicator */}
        <div className="mt-6 flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
          <span>Read article</span>
          <svg
            className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </div>
      </div>
    </article>
  );
}
