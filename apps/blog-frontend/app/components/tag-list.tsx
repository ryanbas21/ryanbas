import { Link } from '@remix-run/react';

type Tag = string[];

interface TagListProps {
  tags: Tag[];
}

export function TagList({ tags }: TagListProps) {
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li key={tag.id}>
          <Link
            to={`/?tag=${tag.id}`}
            className="inline-block px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {tag.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
