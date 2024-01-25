import { ButtonHTMLAttributes } from 'react';

interface ITagProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset';
  category: 'team' | 'individual' | 'hashtag' | 'field';
  name: string;
  className?: string;
}

const tagStyle = {
  team: 'bg-primary text-bs_13',
  individual: 'bg-secondary text-white text-bs_13',
  hashtag: 'bg-blue10 text-bs_13',
  field: 'bg-blue10 px-4 rounded-[.625rem]',
};

export default function Tag({
  type = 'button',
  category,
  name,
  className,
  ...restProps
}: ITagProps) {
  const tagColor = tagStyle[category || 'hashtag'];
  return (
    <button
      type={type}
      className={`${tagColor} ${className} px-3 py-1 rounded-[.3125rem] text-bs_14 mr-1 mb-1`}
      {...restProps}>
      {name}
    </button>
  );
}
