import Image from 'next/image';
import Link from 'next/link';

import UniversalCard from '@/components/card/UniversalCard';
import Category from '@/components/Category';
import { card, images } from '@/utils/data';

import CustomButton from './../../components/button/CustomButton';

export default function Profile() {
  const categories = [
    {
      name: '내 프로젝트',
      link: 'myProject',
    },
    {
      name: '내 모임',
      link: 'myRecruitment',
    },
    {
      name: '내 커뮤니티',
      link: 'myCommunity',
    },
    {
      name: '내 댓글',
      link: 'myComment',
    },
    {
      name: '받은 피드백',
      link: 'receivedFeedback',
    },
  ];
  const data = ['1', '2', '3'];
  return (
    <main className="max-w-max_w m-auto relative flow-root">
      <Link href={`/profile/123`} className="float-end mt-10">
        <CustomButton className="px-2 py-1">수정</CustomButton>
      </Link>
      <section className="flex flex-col items-center gap-y-1 mt-[110px]">
        <h1 className="sr-only">내 프로필</h1>
        <Image
          src="/img/user/default.avif"
          alt="유저 사진"
          width={100}
          height={100}
          className="rounded-full"
        />
        <h2 className="text-bs_20 font-bold">User Name</h2>
        <div className="text-bs_14 my-2">
          <span>4년차</span>
          <span className="font-bold text-bs_16"> 프론트엔드</span>
        </div>
        <p className="w-[300px]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
          error, temporibus quisquam repellat nesciunt minima omnis laboriosam
          dolores! Ab ad error laborum pariatur delectus culpa optio natus
          repellendus architecto iusto?
        </p>
        <div className="mt-3 flex gap-1 text-bs_14">
          <span className="block border rounded-bs_20 border-black px-4">
            Javascript
          </span>
          <span className="block border rounded-bs_20 border-black px-4">
            Javascript
          </span>
          <span className="block border rounded-bs_20 border-black px-4">
            Javascript
          </span>
        </div>
      </section>
      <Category category={categories} />
      <section className="flex flex-col justify-center pt-10 pb-24 max-w-screen-md m-auto">
        {data.map((item) => (
          <UniversalCard
            key={`profileCard-${item}`}
            id={card.id}
            title={card.title}
            content={card.content}
            date={'2020-02-12'}
            image={images[0]}
            size="small"
            className="my-2 w-full"
          />
        ))}
      </section>
    </main>
  );
}
