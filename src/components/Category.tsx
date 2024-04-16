import Link from 'next/link';
import { useRouter } from 'next/router';

import useLoginModal from '@/store/useLoginModal';
import { getCookies } from '@/utils/getCookies';

import CustomButton from './button/CustomButton';

interface ICategoryProps {
  category: { name: string; link: string }[];
  btnValue?: string;
  searchValue?: string;
}

export default function Category({
  category,
  btnValue,
  searchValue,
}: ICategoryProps) {
  const router = useRouter();
  const pathname = router.pathname.split('/')[1];
  const { type } = router.query;
  const { onOpen } = useLoginModal();

  const handleCurrentPage = (current: string) => {
    if (type && type === current.split('&')[0]) {
      return 'border-b-[3px] border-primary';
    }
  };

  const handleGoToWritePage = () => {
    const cookie = getCookies('MID', true);
    if (cookie) {
      router.push(`/write/${pathname}`);
    } else {
      onOpen();
    }
  };

  return (
    <nav className="sticky top-16 w-full border-y bg-white border-gray30 mt-10 z-[1] h-[4.6875rem]">
      <div className="max-w-max_w m-auto flex justify-between items-center mobile:justify-center">
        <ul className="flex text-center">
          <Link
            href={`/${pathname}?type=all${searchValue ? '&text=' + searchValue : ''}`}>
            <li
              className={`${handleCurrentPage('all')} px-2 py-5 mx-10 text-bs_20 cursor-pointer mobile:mx-5`}>
              전체
            </li>
          </Link>
          {category.map((item, index) => (
            <Link
              href={`/${pathname}?type=${item.link}`}
              key={`category-${index}`}>
              <li
                className={`${handleCurrentPage(item.link)} px-2 py-5 mx-10 text-bs_20 cursor-pointer mobile:mx-5`}>
                {item.name}
              </li>
            </Link>
          ))}
        </ul>
        {btnValue && (
          <CustomButton
            className="py-1 px-5 mobile:hidden"
            onClick={handleGoToWritePage}>
            {btnValue}
          </CustomButton>
        )}
      </div>
    </nav>
  );
}
