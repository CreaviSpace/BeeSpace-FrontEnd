import Image from 'next/image';
import { useRouter } from 'next/router';

import CustomButton from '../button/CustomButton';

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
  const router = useRouter();

  const handleUrlMove = () => {
    router.push(`/${type}/1`);
  };

  return (
    <div className="max-w-max_w h-[21.875rem] bg-blue10 rounded-bs_20 mx-auto p-10 flex tablet:rounded-none mobile:rounded-none">
      {image && (
        <div className="relative w-[40rem] h-full rounded-bs_20 overflow-hidden">
          <Image
            src={image}
            alt="banner image"
            fill
            className="object-cover object-top"
          />
        </div>
      )}

      <div className="relative pl-5 pt-5 w-full ">
        <div className="border-b border-black pb-5">
          {date && <div>{date}</div>}
          <div className="mb-5 text-bs_24 font-bold">{title}</div>
          <div className="text-bs_20 line-clamp-3 ">{content}</div>
        </div>
        <div className="absolute right-0 bottom-0 mt-5">
          <CustomButton
            color="secondary"
            className="px-10 py-2 rounded-bs_20"
            onClick={handleUrlMove}>
            자세히 보기
          </CustomButton>
        </div>

        {skill && <div>스킬</div>}
      </div>
    </div>
  );
}
