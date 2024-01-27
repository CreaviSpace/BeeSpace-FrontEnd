import Image from 'next/image';

interface IPopularImageProps {
  img1: string;
  img2: string;
}

export default function PopularImage({ img1, img2 }: IPopularImageProps) {
  return (
    <div className="w-full p-1">
      <div className="relative right-0 my-5 h-80 w-[34.375rem] tablet:w-[47.9375rem] tablet:h-[27.875rem] min_mobile:w-[20.625rem]  min_mobile:h-[11.625rem]">
        {img1 && (
          <Image
            src={img1}
            alt="프로젝트 이미지"
            fill
            className="object-cover object-top p-1 rounded-bs_10"
          />
        )}
      </div>
      <div className="relative right-0 my-5 h-80 w-[34.375rem] tablet:w-[47.9375rem] tablet:h-[27.875rem] min_mobile:w-[20.625rem]  min_mobile:h-[11.625rem]">
        {img2 && (
          <Image
            src={img2}
            alt="프로젝트 이미지"
            fill
            className="object-cover object-top p-1 rounded-bs_10"
          />
        )}
      </div>
    </div>
  );
}
