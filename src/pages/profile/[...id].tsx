import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import CustomButton from '@/components/button/CustomButton';
import SortButton from '@/components/button/SortButton';
import ProfileCard from '@/components/card/ProfileCard';
import UniversalCard from '@/components/card/UniversalCard';
import ProfileCategory from '@/components/profile/ProfileCategory';
import SkeletonProfile from '@/components/skeleton/SkeletonProfile';
import SkeletonUniversalCard from '@/components/skeleton/SkeletonUniversalCard';
import useGetInfiniteProfilePosts from '@/hooks/queries/profile/useGetInfiniteProfilePosts';
import useGetProfileMember from '@/hooks/queries/profile/useGetProfileMember';
import useObserver from '@/hooks/useObserver';
import useLogin from '@/store/useLogin';
import { IUniversalType } from '@/types/global';
import { getCookies } from '@/utils/cookie/getCookies';

import Custom404 from '../404';

const POSTTYPEOTIONS = [
  { type: 'project', name: '프로젝트' },
  { type: 'recruit', name: '모집' },
  { type: 'community', name: '커뮤니티' },
];

const SORTTPYEOPTIONS = [
  { type: 'desc', name: '최신순' },
  { type: 'asc', name: '오래된 순' },
];

const CATEGORIES = [
  {
    name: '내 게시물',
    type: 'project',
  },
  {
    name: '받은 피드백',
    type: 'feedback',
  },
  {
    name: '내 댓글',
    type: 'comment',
  },
  {
    name: '북마크',
    type: 'bookmark',
  },
];

const MID = getCookies('MID', true);

export default function Profile() {
  const [postType, setPostType] = useState({
    type: 'project',
    name: '프로젝트',
  });
  const [sortType, setSortType] = useState({
    type: 'desc',
    name: '최신순',
  });
  const [category, setCategory] = useState({
    type: 'project',
    name: '내 게시물',
  });

  const router = useRouter();
  const memberId = router.query.id;
  const login = useLogin();

  const { isLoading: profileLoading, data: profile } = useGetProfileMember(
    memberId as string
  );

  const {
    isLoading: contentsLoading,
    data: contents,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetInfiniteProfilePosts(
    memberId as string,
    24,
    postType.type,
    sortType.type,
    category.type
  );

  const observerRef = useObserver(isFetchingNextPage, isError, fetchNextPage);

  if (isError) {
    return <Custom404 />;
  }

  return (
    <main className="relative flow-root min-h-min_h">
      {profileLoading ? (
        <SkeletonProfile />
      ) : (
        profile && (
          <section className="max-w-screen-md m-auto my-[100px]">
            <h1 className="sr-only">내 프로필</h1>
            {login && profile.memberId === MID && (
              <Link href={`/profile/editer`} className="flex justify-end mt-10">
                <CustomButton className="px-2 py-1">수정</CustomButton>
              </Link>
            )}
            <ProfileCard items={profile} />
          </section>
        )
      )}

      <ProfileCategory
        category={CATEGORIES}
        setSelectedTab={setCategory}
        selectedTab={category}
        memberID={(!profileLoading && profile && profile.memberId) || ''}
      />

      <section className="pt-10 pb-24 max-w-4xl m-auto relative">
        <div>
          <SortButton
            select={sortType}
            setSelect={setSortType}
            options={SORTTPYEOPTIONS}
            className="right-[6.25rem]"
          />
          <SortButton
            select={postType}
            setSelect={setPostType}
            options={POSTTYPEOTIONS}
            className="right-0"
          />
        </div>
        <div className="mt-7 flex flex-col justify-center">
          {contentsLoading ? (
            [1, 2, 3, 4, 5, 6].map((item, index) => (
              <SkeletonUniversalCard key={`${item}-${index}`} size="large" />
            ))
          ) : (
            <>
              {contents?.pages.map((item, index) =>
                item?.map((item: IUniversalType) => (
                  <>
                    <UniversalCard
                      key={`myContent-list-${item.id}`}
                      id={item.id}
                      postType={postType.type}
                      title={item.title ? item.title : item.contentsTitle}
                      content={
                        item.bannerContent ? item.bannerContent : item.content
                      }
                      image={item.thumbnail ? item.thumbnail : ''}
                      size="large"
                      className="my-2 w-full"
                    />
                  </>
                ))
              )}
            </>
          )}
          {!hasNextPage ? null : isFetchingNextPage ? (
            [1, 2, 3, 4, 5, 6].map((item, index) => (
              <SkeletonUniversalCard key={`${item}-${index}`} size="large" />
            ))
          ) : (
            <div ref={observerRef}></div>
          )}
        </div>
      </section>
    </main>
  );
}
