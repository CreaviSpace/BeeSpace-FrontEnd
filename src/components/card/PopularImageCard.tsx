import Image from 'next/image';
import Link from 'next/link';

interface IPopularImageProps {
  img1: string;
  img2: string;
  link1?: string;
  link2?: string;
}

export default function PopularImageCard({
  img1,
  img2,
  link1,
  link2,
}: IPopularImageProps) {
  return (
    <div className="w-full p-1">
      <Link href={`${link1}` ? `${link1}` : '/'}>
        <div className="relative right-0 my-5 h-80 w-[34.375rem] tablet:w-[47.9375rem] tablet:h-[27.875rem] min_mobile:w-[20.625rem]  min_mobile:h-[11.625rem]">
          <Image
            src={img1}
            alt="프로젝트 이미지"
            fill
            className="object-cover object-top p-1 rounded-bs_10"
          />
        </div>
      </Link>
      <Link href={`${link2}` ? `${link2}` : '/'}>
        <div className="relative right-0 my-5 h-80 w-[34.375rem] tablet:w-[47.9375rem] tablet:h-[27.875rem] min_mobile:w-[20.625rem]  min_mobile:h-[11.625rem]">
          <Image
            src={img2}
            alt="프로젝트 이미지"
            fill
            className="object-cover object-top p-1 rounded-bs_10"
          />
        </div>
      </Link>
    </div>
  );
}
