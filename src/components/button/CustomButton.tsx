import { ButtonHTMLAttributes, ReactNode } from 'react';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset';
  color?: 'primary' | 'secondary' | 'hashtag' | 'default';
  children: string | ReactNode;
  className?: string;
}

const colorStyles = {
  primary: 'bg-primary hover:bg-yellow20',
  secondary: 'bg-blue20 hover:bg-[#b2dcff]',
  hashtag: 'bg-blue10 border',
  default: 'bg-transparent border border-black',
};

export default function CustomButton({
  type = 'button',
  color = 'default',
  children,
  className,
  ...restProps
}: IButtonProps) {
  const buttonColor = colorStyles[color || 'default'];

  return (
    <button
      type={type}
      className={`${buttonColor} ${className} rounded-bs_5`}
      {...restProps}>
      {children}
    </button>
  );
}
