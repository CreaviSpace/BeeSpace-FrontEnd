import Link from 'next/link';

interface ILongButtonProps {
  content: string;
  link: string;
  paddingX: string;
  paddingY: string;
  rounded?: string;
  color?: string;
}

export default function LongButton({
  content,
  link,
  paddingX,
  paddingY,
  rounded = 'rounded-[10px]',
  color,
}: ILongButtonProps) {
  return (
    <button
      className={`${paddingX} ${paddingY} ${rounded} ${color ? color : 'border border-black'} `}>
      <Link href={link}>{content}</Link>
    </button>
  );
}
