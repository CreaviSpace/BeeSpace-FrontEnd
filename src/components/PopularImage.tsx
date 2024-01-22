import Image from 'next/image';

interface IPopularImageProps {
  img1: string;
  img2: string;
}

export default function PopularImage({ img1, img2 }: IPopularImageProps) {
  return (
    <div className="w-full">
      <div className="relative right-0 w-[550px] h-80 my-5">
        <Image
          src={img1}
          alt="프로젝트 이미지"
          fill
          className="object-cover object-top p-1 rounded-xl"
        />
      </div>
      <div className="relative right-0 w-[550px] h-80 my-5">
        <Image
          src={img2}
          alt="프로젝트 이미지"
          fill
          className="object-cover object-top p-1 rounded-xl"
        />
      </div>
    </div>
  );
}
