import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import UniversalCard from '@/components/card/UniversalCard';
import Category from '@/components/Category';
import useSearch from '@/hooks/useSearch';
import { card } from '@/utils/data';

export default function Search() {
  const [size, setSize] = useState(6);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const router = useRouter();
  const { text } = router.query;
  const {
    isLoading,
    isError,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSearch(size, page, text as string, 'all');

  useEffect(() => {
    data?.pages.map((page) => {
      setPage((prev) => prev + page.length);
    });
  }, []);

  const categories = [
    {
      name: '프로젝트',
      link: `project&text=${text}`,
    },
    {
      name: '모집',
      link: `recruitment&text=${text}`,
    },
    {
      name: '커뮤니티',
      link: `community&text=${text}`,
    },
  ];

  const side = [
    { name: '개인 프로젝트', link: '#' },
    { name: '팀 프로젝트', link: '#' },
    { name: '스터디', link: '#' },
    { name: '프로젝트 모집', link: '#' },
    { name: 'Q&A', link: '#' },
    { name: '피드백', link: '#' },
    { name: '고민', link: '#' },
    { name: '수다', link: '#' },
  ];

  const sizes = [1, 2, 3, 4, 5];

  return (
    <main>
      <Category category={categories} searchValue={text as string} />
      <div className="grid grid-cols-5 max-w-max_w m-auto py-10 tablet:grid-cols-4 mobile:grid-cols-4">
        <aside className="col-span-1 tablet:hidden mobile:hidden">
          <div className="h-[2.25rem] my-7"></div>
          <ul className="border border-gray10 py-8 pl-5 pr-20 w-fit rounded-bs_10 fixed">
            {side.map((item, index) => (
              <li key={`${item}-${index}`} className="py-1 text-bs_18">
                {item.name}
              </li>
            ))}
          </ul>
        </aside>
        <section className="col-span-4 mx-auto">
          {isLoading ? (
            '로딩중'
          ) : (
            <>
              <h2 className="text-bs_34 font-bold my-5">전체 {totalPage}</h2>
              {sizes.map((item, index) => (
                <UniversalCard
                  key={`${item}-${index}`}
                  id={card.id}
                  title={card.title}
                  content={card.content}
                  date={card.date}
                  size="large"
                  className="my-5"
                />
              ))}
            </>
          )}
        </section>
      </div>
    </main>
  );
}
