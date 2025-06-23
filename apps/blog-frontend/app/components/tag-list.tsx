type Tag = string;

interface TagListProps {
  tags: Tag;
}

export function TagList({ tags }: TagListProps) {
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.split(',').map((tag) => (
        <li key={tag}>
          <span className="inline-flex items-center px-3 py-1.5 text-xs font-medium bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-800/50 rounded-full hover:from-blue-100 hover:to-indigo-100 dark:hover:from-blue-900/50 dark:hover:to-indigo-900/50 transition-all duration-200 hover:scale-105 cursor-default">
            {tag.trim()}
          </span>
        </li>
      ))}
    </ul>
  );
}
