import Link from 'next/link';
import { useRouter } from 'next/router';

import CustomButton from './button/CustomButton';

interface ICategoryProps {
  category: { name: string; link: string }[];
  btnValue?: string;
}

export default function Category({ category, btnValue }: ICategoryProps) {
  const router = useRouter();
  const pathname = router.pathname.split('/')[1];
  const { type } = router.query;

  const handleCurrentPage = (current: string) => {
    if (type && type === current) {
      return 'border-b-[3px] border-primary';
    }
  };

  const handleGoToWritePage = () => {
    router.push(`/write/${pathname}`);
  };

  return (
    <nav className="sticky top-16 w-full border-y bg-white border-gray30 mt-10 z-[1]">
      <div className="max-w-max_w m-auto flex justify-between items-center mobile:justify-center">
        <ul className="flex text-center">
          <li
            className={`${handleCurrentPage('all')} px-2 py-5 mx-10 text-bs_20 cursor-pointer mobile:mx-5`}>
            <Link href={`/${pathname}?type=all`}>전체</Link>
          </li>
          {category.map((item, index) => (
            <li
              key={`category-${index}`}
              className={`${handleCurrentPage(item.link)} px-2 py-5 mx-10 text-bs_20 cursor-pointer mobile:mx-5`}>
              <Link href={`/${pathname}?type=${item.link}`}>{item.name}</Link>
            </li>
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
