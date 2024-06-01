import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import UniversalCard from '@/components/card/UniversalCard';
import Category from '@/components/Category';
import SkeletonUniversalCard from '@/components/skeleton/SkeletonUniversalCard';
import { useGetInfiniteSearchPosts } from '@/hooks/queries/useSearch';
import useObserver from '@/hooks/useObserver';
import { IUniversalType } from '@/types/global';

const SIDE_CATEGORIES = [
  { name: '개인 프로젝트', link: 'INDIVIDUAL' },
  { name: '팀 프로젝트', link: 'TEAM' },
  { name: '스터디', link: 'STUDY' },
  { name: '프로젝트 모집', link: 'PROJECT_RECRUIT' },
  { name: 'Q&A', link: 'QNA' },
  { name: '고민', link: 'CONCERN' },
  { name: '수다', link: 'CHAT' },
];

const CATEGORIES = [
  {
    name: '프로젝트',
    link: `project`,
  },
  {
    name: '모집',
    link: `recruitment`,
  },
  {
    name: '커뮤니티',
    link: `community`,
  },
];

const PAGE_SIZE = 24;

export default function Search() {
  const router = useRouter();
  const { type, text } = router.query;

  const [searchValue, setSearchValue] = useState('');
  const [searchType, setSearchType] = useState('');

  useEffect(() => {
    setSearchValue(text as string);
    setSearchType(type as string);
  }, [text, type]);

  const {
    isLoading,
    isError,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetInfiniteSearchPosts(
    PAGE_SIZE,
    searchValue as string,
    searchType as string
  );

  const observerRef = useObserver(isFetchingNextPage, isError, fetchNextPage);

  return (
    <main className="min-h-min_h">
      <Category category={CATEGORIES} searchValue={searchValue} />
      <div className="grid grid-cols-5 max-w-max_w m-auto py-10 tablet:grid-cols-4 mobile:grid-cols-4 tablet:px-8 mobile:px-6">
        <aside className="col-span-1 tablet:hidden mobile:hidden">
          <div className="h-[2.25rem] my-7"></div>
          <ul
            className="border border-gray10 py-8 pl-5 pr-20 w-fit rounded-bs_10 sticky 
          top-[calc(4.6875rem_+_4rem)]">
            {SIDE_CATEGORIES.map((item, index) => (
              <li key={`${item}-${index}`} className="py-1 text-bs_18">
                <Link href={`/search?type=${item.link}&text=${searchValue}`}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
        <section className="col-span-4 mx-auto w-full">
          {isLoading
            ? [1, 2, 3, 4, 5, 6].map((_, index) => (
                <SkeletonUniversalCard size="large" key={index} />
              ))
            : data?.pages[0] && (
                <>
                  <h2 className="text-bs_34 font-bold my-5">
                    전체 {data?.pages[0].length}
                  </h2>
                  {data?.pages.map((page) => {
                    return page.map((item: IUniversalType, index: number) => (
                      <UniversalCard
                        key={`${item}-${index}`}
                        id={item.id}
                        title={item.title}
                        content={
                          item.bannerContent ? item.bannerContent : item.content
                        }
                        image={item.thumbnail}
                        postType={item.postType}
                        size="large"
                        className="my-5"
                      />
                    ));
                  })}
                </>
              )}

          {!hasNextPage ? null : isFetchingNextPage ? (
            [1, 2, 3, 4, 5, 6].map((_, index) => (
              <SkeletonUniversalCard size="large" key={index} />
            ))
          ) : (
            <div ref={observerRef}></div>
          )}
        </section>
      </div>
    </main>
  );
}
