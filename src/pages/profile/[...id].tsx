import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import CustomButton from '@/components/button/CustomButton';
import ProfileCard from '@/components/card/ProfileCard';
import UniversalCard from '@/components/card/UniversalCard';
import Category from '@/components/Category';
import SkeletonProfile from '@/components/skeleton/SkeletonProfile';
import SkeletonUniversalCard from '@/components/skeleton/SkeletonUniversalCard';
import useMemberContents from '@/hooks/profile/useMemberContents';
import useMemberProfileGet from '@/hooks/profile/useMemberProfileGet';
import { IUniversalType } from '@/types/global';

import SortButton from '../../components/button/SortButton';

const POSTTYPEOTIONS = [
  { type: 'project', name: '프로젝트' },
  { type: 'recruit', name: '모집' },
  { type: 'community', name: '커뮤니티' },
];

const SORTTPYEOPTIONS = [
  { type: 'ASC', name: '오래된 순' },
  { type: 'DESC', name: '최신순' },
];

const categories = [
  {
    name: '내 게시글',
    link: 'myPost',
  },
  {
    name: '받은 피드백',
    link: 'receivedFeedback',
  },
  {
    name: '내 댓글',
    link: 'myComment',
  },
  {
    name: '북마크',
    link: 'bookmark',
  },
];

export default function Profile() {
  const [postType, setPostType] = useState({
    type: 'project',
    name: '프로젝트',
  });
  const [sortType, setSortType] = useState({
    type: 'ASC',
    name: '오래된 순',
  });
  const router = useRouter();
  const memberId = router.query.id;

  const { isLoading: profileLoading, data: profile } = useMemberProfileGet(
    parseInt(memberId as string)
  );

  const {
    isLoading: contentsLoading,
    data: contents,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useMemberContents(
    parseInt(memberId as string),
    3,
    postType.type,
    sortType.type
  );

  return (
    <main className="relative flow-root">
      {profileLoading ? (
        <SkeletonProfile />
      ) : (
        <section className="max-w-screen-md m-auto mt-[4rem]">
          <h1 className="sr-only">내 프로필</h1>
          <Link href={`/profile/editer`} className="flex justify-end mt-10">
            <CustomButton className="px-2 py-1">수정</CustomButton>
          </Link>
          <ProfileCard
            profileUrl={profile.profileUrl}
            memberNickname={profile.memberNickname}
            career={profile.career}
            position={profile.position}
            introduce={profile.introduce}
          />
        </section>
      )}
      <Category category={categories} />
      <section className="pt-10 pb-24 max-w-max_w m-auto relative">
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
        <div className="mt-7 flex flex-col justify-center border">
          {contentsLoading ? (
            [1, 2, 3].map((item, index) => (
              <SkeletonUniversalCard key={`${item}-${index}`} size="large" />
            ))
          ) : (
            <>
              {contents?.pages.map((item, index) =>
                item?.map((item: IUniversalType) => (
                  <UniversalCard
                    key={`myContent-list-${index}`}
                    id={item.id}
                    postType={item.postType}
                    title={item.title}
                    content={
                      item.bannerContent ? item.bannerContent : item.content
                    }
                    image={item.thumbnail ? item.thumbnail : ''}
                    size="small"
                    className="my-2 w-full"
                  />
                ))
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}
