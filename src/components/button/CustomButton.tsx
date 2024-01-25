import { ButtonHTMLAttributes } from 'react';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset';
  color?: 'primary' | 'secondary' | 'default';
  children: string;
  className?: string;
}

const colorStyles = {
  primary: 'bg-primary hover:bg-yellow20',
  secondary: 'bg-blue20 hover:bg-blue10',
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
