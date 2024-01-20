import { ButtonHTMLAttributes } from 'react';

interface TagProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset';
  category?: 'team' | 'individual' | 'hashtag' | 'projectField';
  name?: string;
  className?: string;
}

const tagStyle = {
  team: 'bg-primary',
  individual: 'bg-secondary',
  hashtag: 'bg-blue10',
  projectField: 'bg-blue10 rounded-[.625rem] text-bs_16',
};

export default function Tag({
  type = 'button',
  category,
  name,
  className,
  ...restProps
}: TagProps) {
  const tagColor = tagStyle[category || 'hashtag'];
  return (
    <button
      type={type}
      className={`${tagColor} ${className} px-4 py- rounded-[.3125rem] text-bs_14`}
      {...restProps}>
      {name}
    </button>
  );
}
