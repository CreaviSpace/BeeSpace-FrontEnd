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
  const { id } = router.query;

  const handleCurrentPage = (current: string) => {
    if (id) {
      if (id[0] === current) {
        return 'border-b-[3px] border-primary';
      }
    } else {
      if (current === 'all') {
        return 'border-b-[3px] border-primary';
      }
    }
  };

  const handleGoToWritePage = () => {
    router.push(`/write/${pathname}`);
  };

  return (
    <nav className="w-full h-20 border border-gray30">
      <div className="max-w-max_w m-auto flex justify-between items-center">
        <ul className="flex text-center">
          <li
            className={`${handleCurrentPage('all')}  w-20 py-5 mx-10 text-bs_20 cursor-pointer`}>
            <Link href={`/${pathname}/all`}>전체</Link>
          </li>
          {category.map((item) => (
            <li
              key={`category-${item}`}
              className={`${handleCurrentPage(item.link)} w-20 py-5 mx-10 text-bs_20 cursor-pointer`}>
              <Link href={`/${pathname}/${item.link}`}>{item.name}</Link>
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
