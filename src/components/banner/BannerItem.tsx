import Image from 'next/image';
import { useRouter } from 'next/router';

import CustomButton from '../button/CustomButton';

interface IBannerProps {
  postType: string;
  id: number;
  title: string;
  content: string;
  image?: string;
  skill?: string[];
  date?: string;
  techStacks: {
    techStackId: number;
    techStack: string;
    iconUrl: string;
  }[];
  end?: string;
}

export default function BannerItem({
  postType,
  title,
  content,
  image,
  skill,
  date,
  id,
  techStacks,
}: IBannerProps) {
  const router = useRouter();

  const handleUrlMove = () => {
    const lowerCasePostType = postType.toLowerCase();
    router.push(
      `/${lowerCasePostType === 'recruit' ? 'recruitment' : lowerCasePostType}/${id}`
    );
  };

  return (
    <div className="max-w-max_w h-[21.875rem] bg-blue10 rounded-bs_20 mx-auto p-10 flex tablet:rounded-none mobile:rounded-none min_mobile:aspect-w-16 min_mobile:aspect-h-9">
      {/* 배너 이미지 */}
      {image && (
        <div className="relative w-[40rem] h-full rounded-bs_20 overflow-hidden min_mobile:blur-sm min_mobile:rounded-none min_mobile:w-full">
          <Image
            src={image}
            alt="프로젝트 배너 이미지"
            fill
            sizes="(max-width: 767px) 400px,(max-width: 550px) 300px"
            className="object-cover object-top p-1"
          />
        </div>
      )}
      {/* 날짜, 글 제목, 글 내용 */}
      <div className="relative px-10 pt-8 w-full">
        <div>
          {date && (
            <div className="w-fit text-bs_14 bg-blue30 text-white rounded-bs_5 px-2 py-1 mb-3">
              {date}
            </div>
          )}
          <h2 className="text-bs_24 font-bold mb-2 mobile:text-bs_20">
            {title}
          </h2>
          <p
            className="text-bs_16 line-clamp-3"
            dangerouslySetInnerHTML={{ __html: content }}></p>
        </div>
        <div className="border-b pt-3 h-0 border-gray30 mobile:hidden"></div>
        {/* 기술스택 */}
        {techStacks && (
          <div className="flex mt-2">
            {techStacks?.map((item, index) => (
              <Image
                key={index}
                src={item.iconUrl}
                alt={item.techStack}
                width={35}
                height={35}
              />
            ))}
          </div>
        )}
        <div className="absolute right-5 bottom-0 mt-5 mobile:bottom-5 mobile:-translate-x-4">
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
