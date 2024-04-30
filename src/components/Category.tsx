import { useRouter } from 'next/router';
import { useState } from 'react';

import useLoginModal from '@/store/modal/useLoginModal';
import useLogin from '@/store/useLogin';
import { parseValue } from '@/utils/parseValue';

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
  const [selectCategory, setSelectCategory] = useState('전체');
  const [isCategoryToggle, setIsCategoryToggle] = useState(false);
  const { type } = router.query;
  const { onOpen } = useLoginModal();
  const { login } = useLogin();

  const handleCurrentPage = (current: string) => {
    if (type && type === current.split('&')[0]) {
      return 'border-b-[3px] border-primary';
    }
  };

  const handleGoToWritePage = () => {
    if (login) {
      router.push(`/write/${pathname}`);
    } else {
      onOpen();
    }
  };

  const handleCategoryToggle = () => {
    setIsCategoryToggle(!isCategoryToggle);
  };

  const handleCategoryOnClick = (link: string) => {
    setSelectCategory(parseValue(link));
    router.push(
      `/${pathname}?type=${link}${searchValue ? '&text=' + searchValue : ''}`
    );
    setIsCategoryToggle(false);
  };

  return (
    <nav className="sticky top-16 w-full border-y bg-white border-gray30 mt-10 z-10 h-[4.6875rem]">
      <div className="max-w-max_w m-auto flex justify-between items-center mobile:justify-center h-full">
        <ul className="flex mobile:flex-col mobile:w-full h-full">
          <li
            className={`mobile:block hidden text-bs_20 cursor-pointer ${isCategoryToggle && 'border-b border-gray30'}`}>
            <button
              className="px-2 py-5 w-full h-full"
              onClick={handleCategoryToggle}>
              {selectCategory}
            </button>
          </li>

          <li
            className={`${!isCategoryToggle && 'mobile:hidden'} ${handleCurrentPage('all')} text-bs_20 text-center cursor-pointer bg-white mx-10 mobile:mx-0`}>
            <button
              onClick={() => handleCategoryOnClick('all')}
              className="px-2 py-5 w-full h-full">
              전체
            </button>
          </li>
          {category.map((item, index) => (
            <li
              className={`${!isCategoryToggle && 'mobile:hidden'} ${handleCurrentPage(item.link)} text-bs_20 text-center cursor-pointer bg-white mx-10 mobile:mx-0 ${category.length === index + 1 && 'mobile:border-b mobile:border-gray30'}`}
              key={`category-${index}`}>
              <button
                onClick={() => handleCategoryOnClick(item.link)}
                className="px-2 py-5 w-full h-full">
                {item.name}
              </button>
            </li>
          ))}
        </ul>
        {btnValue && (
          <CustomButton
            className="py-1 px-5 w-fit mobile:hidden"
            onClick={handleGoToWritePage}>
            {btnValue}
          </CustomButton>
        )}
      </div>
    </nav>
  );
}
