import { Link } from '@remix-run/react';

type Tag = string;

interface TagListProps {
  tags: Tag;
}

export function TagList({ tags }: TagListProps) {
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.split(',').map((tag) => (
        <li key={tag}>{tag}</li>
      ))}
    </ul>
  );
}
