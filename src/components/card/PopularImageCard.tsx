import Image from 'next/image';
import Link from 'next/link';

interface IPopularImageProps {
  img1: string;
  img2: string;
  link1: string;
  link2: string;
}

export default function PopularImageCard({
  img1,
  img2,
  link1,
  link2,
}: IPopularImageProps) {
  return (
    <div className="w-[767px] mx-auto">
      <Link href={link1}>
        <div className="relative my-5 w-[100%] aspect-w-16 aspect-h-9">
          {img1 !== undefined && (
            <Image
              src={img1}
              alt="프로젝트 이미지"
              fill
              className="object-cover object-top px-1 rounded-bs_10"
            />
          )}
        </div>
      </Link>
      <Link href={link2}>
        <div className="relative my-5 w-[100%] aspect-w-16 aspect-h-9">
          {img2 !== undefined && (
            <Image
              src={img2}
              alt="프로젝트 이미지"
              fill
              className="object-cover object-top px-1 rounded-bs_10 "
            />
          )}
        </div>
      </Link>
    </div>
  );
}
