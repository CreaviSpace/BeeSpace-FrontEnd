import Image from 'next/image';

import Button from '../button/Button';

interface IBannerProps {
  type: boolean;
  id: string;
  title: string;
  content: string;
  image?: string;
  skill?: string[];
  date?: string;
}

export default function BannerItem({
  type,
  title,
  content,
  image,
  skill,
  date,
}: IBannerProps) {
  return (
    <div className="max-w-[1200px] h-[350px] bg-[#C3D7D9] rounded-[20px] mx-auto p-10 flex">
      {image && (
        <div className="w-[40rem] h-full rounded-[20px] overflow-hidden">
          <Image src={image} alt="banner image" width={400} height={200} />
        </div>
      )}

      <div className="relative pl-5 pt-5 w-full ">
        <div className="border-b border-black pb-5">
          <div className="mb-5 text-bs_34">{title}</div>
          <div className="text-bs_20">{content}</div>
        </div>
        <div className="absolute right-0 bottom-0 mt-5">
          <Button
            content="자세히 보기"
            link="/#"
            paddingX={'px-5'}
            paddingY={'py-1'}
            rounded={'rounded-[20px]'}
            color="bg-blue30"
          />
        </div>
      </div>
    </div>
  );
}
