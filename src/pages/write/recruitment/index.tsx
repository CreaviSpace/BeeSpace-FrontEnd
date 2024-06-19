import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import CustomButton from '@/components/button/CustomButton';
import Classification from '@/components/write/recruitment/Classification';
import Communication from '@/components/write/recruitment/Communication';
import Deadline from '@/components/write/recruitment/Deadline';
import OnOffLine from '@/components/write/recruitment/OnOffLine';
import Period from '@/components/write/recruitment/Period';
import RecruitPersonnel from '@/components/write/recruitment/RecruitPersonnel';
import SkillStackInput from '@/components/write/SkillStackInput';
import TitleEditor from '@/components/write/TextEditor/TitleEditor';
import { useGetRecruitPost } from '@/hooks/queries/post/useGetPost';
import useMutateCreatePost from '@/hooks/queries/post/useMutateCreatePost';
import useMutateUpdatePost from '@/hooks/queries/post/useMutateUpdatePost';
import useLoginStore from '@/store/useLoginStore';
import useRecruitData from '@/store/useRecruitData';

const TextEditor = dynamic(
  () =>
    import('@/components/write/TextEditor/TextEditor').then(
      (mod) => mod.default
    ),
  { ssr: false }
);

export default function RecruitmentWrite() {
  const router = useRouter();
  const { id } = router.query;

  const { login } = useLoginStore();
  const today = new Date().toString();
  const {
    category,
    contactWay,
    contact,
    techStacks,
    amount,
    proceedWay,
    workDay,
    title,
    content,
    end,
    positions,
    images,
    setter,
  } = useRecruitData();

  const recruitData = {
    category,
    contact,
    endFormat: 'yyyy-MM-dd',
    contactWay,
    amount,
    proceedWay,
    workDay,
    title,
    content,
    end,
    positions: positions.filter((item) => item.position !== 'default'),
    techStacks: techStacks.map((item) => {
      const { techStack } = item;
      return { techStack };
    }),
    images,
  };

  const { isLoading, isError, data, isFetching } = useGetRecruitPost(
    'recruit',
    id as string
  );
  const { mutate: recruitPost } = useMutateCreatePost('recruit', recruitData);
  const { mutate: recrutiUpdate } = useMutateUpdatePost(
    parseInt(id as string),
    'recruit',
    recruitData
  );

  useEffect(() => {
    if (!isLoading && id) {
      setter.setCategory(data.category);
      setter.setContact(data.contact);
      setter.setAmount(data.amount);
      setter.setProceedWay(data.proceedWay);
      setter.setWorkDay(data.workDay);
      setter.setTitle(data.title);
      setter.setContent(data.content);
      setter.setEnd(data.end);
      setter.setPositions(data.positions);
      if (data.techStacks && data.techStacks.length > 0) {
        const teachStacks: { techStack: string; iconUrl: string }[] = [];
        data.techStacks.map(
          (item: {
            techStackId: number;
            techStack: string;
            iconUrl: string;
          }) => {
            teachStacks.push({
              techStack: item.techStack,
              iconUrl: item.iconUrl,
            });
          }
        );
        setter.setTechStacks(teachStacks);
        if (data.images && data.images.length > 0) {
          data.images.map((item: string) => {
            setter.setImages(item);
          });
        }
      }
    } else {
      setter.setCategory('PROJECT_RECRUIT');
      setter.setContactWay('');
      setter.setContact('');
      setter.setTechStacks([]);
      setter.setAmount(0);
      setter.setProceedWay('ONLINE');
      setter.setWorkDay(1);
      setter.setTitle('');
      setter.setContent('');
      setter.setEnd(today);
      setter.setPositions([]);
      // setter.setImages('');
    }
  }, [isFetching, id]);

  return (
    <main className="max-w-max_w min-w-min_w min-h-min_h m-auto p-20 mobile:p-6">
      <section>
        <h1 className="text-center text-[2rem] font-bold">
          모집 정보를 입력해주세요
        </h1>
        <ul className="my-20 grid grid-cols-2 gap-x-20 tablet:grid-cols-1 mobile:grid-cols-1">
          <li className="mt-14">
            <Classification
              category={category}
              setCategory={setter.setCategory}
            />
          </li>
          <li className="mt-14">
            <OnOffLine
              proceedWay={proceedWay}
              setProceedWay={setter.setProceedWay}
            />
          </li>
          <li className="mt-14">
            <RecruitPersonnel
              amount={amount}
              setAmount={setter.setAmount}
              positions={positions}
              setPositions={setter.setPositions}
            />
          </li>
          <li className="mt-14">
            <SkillStackInput
              techStackDtos={techStacks}
              setTechStackDtos={setter.setTechStacks}
            />
          </li>
          <li className="mt-14">
            <Period workDay={workDay} setWorkDay={setter.setWorkDay} />
            <Communication
              contact={contact}
              setContact={setter.setContact}
              contactWay={!isLoading && id && data.contactWay}
              setContactWay={setter.setContactWay}
            />
          </li>
          <li className="mt-14">
            <Deadline end={end} setEnd={setter.setEnd} />
          </li>
        </ul>
      </section>
      <section>
        <TitleEditor title={title} setTitle={setter.setTitle} />
        <TextEditor
          values={content}
          setValues={setter.setContent}
          setImages={setter.setImages}
        />
      </section>

      <div className="text-right mt-10">
        <Link href="/recruitment/">
          <CustomButton className="py-3 px-10 mr-3">취소</CustomButton>
        </Link>
        {login && (
          <CustomButton
            color="secondary"
            className="py-3 px-10"
            onClick={() => {
              if (id && data.id) {
                recrutiUpdate();
              } else {
                recruitPost();
              }
            }}>
            작성
          </CustomButton>
        )}
      </div>
    </main>
  );
}
