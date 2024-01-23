import Link from 'next/link';
import { useRouter } from 'next/router';

import CustomButton from './button/CustomButton';

interface ICategoryProps {
  category: { name: string; link: string }[];
  btnValue: string;
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
    <nav className="w-full h-20 border-y border-gray30">
      <div className="max-w-max_w m-auto flex justify-between items-center">
        <ul className="flex text-center">
          <li
            className={`${handleCurrentPage('all')}  px-2 py-5 mx-10 text-bs_20 cursor-pointer`}>
            <Link href={`/${pathname}?type=all`}>전체</Link>
          </li>
          {category.map((item) => (
            <li
              key={`category-${item}`}
              className={`${handleCurrentPage(item.link)} px-2 py-5 mx-10 text-bs_20 cursor-pointer`}>
              <Link href={`/${pathname}?type=${item.link}`}>{item.name}</Link>
            </li>
          ))}
        </ul>
        <CustomButton className="py-1 px-5" onClick={handleGoToWritePage}>
          {btnValue}
        </CustomButton>
      </div>
    </nav>
  );
}
