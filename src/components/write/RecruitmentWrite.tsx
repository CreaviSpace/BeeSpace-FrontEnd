import dynamic from 'next/dynamic';
import { useEffect } from 'react';

import CustomButton from '@/components/button/CustomButton';
import Classification from '@/components/write/recruitment/Classification';
import Communication from '@/components/write/recruitment/Communication';
import Deadline from '@/components/write/recruitment/Deadline';
import OnOffLine from '@/components/write/recruitment/OnOffLine';
import Period from '@/components/write/recruitment/Period';
import Personnel from '@/components/write/recruitment/Personnel';
import SkillStackInput from '@/components/write/SkillStackInput';
import TitleEditor from '@/components/write/TextEditor/TitleEditor';
import useRecruitDetail from '@/hooks/useRecruitDetail';
import useWritePost from '@/hooks/useWritePost';
import useWriteUpdate from '@/hooks/useWriteUpdate';
import useRecruitData from '@/store/useRecruitData';

const TextEditor = dynamic(
  () =>
    import('@/components/write/TextEditor/TextEditor').then(
      (mod) => mod.default
    ),
  { ssr: false }
);

interface IRecruitmentWriteProps {
  id: string | undefined;
}
export default function RecruitmentWrite({ id }: IRecruitmentWriteProps) {
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
    positions,
    techStacks,
  };

  const { isLoading, isError, data, isFetching } = useRecruitDetail(id);
  const { mutate: recruitPost } = useWritePost('RECRUIT', recruitData);
  const { mutate: recrutiUpdate } = useWriteUpdate(
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
        const teachStacks: { techStackId: number }[] = [];
        data.techStacks.map(
          (item: {
            techStackId: number;
            techStack: string;
            iconUrl: string;
          }) => {
            teachStacks.push({ techStackId: item.techStackId });
          }
        );
        setter.setTechStacks(teachStacks);
      }
    } else {
      setter.setCategory('PROJECT_RECRUIT');
      setter.setContactWay('');
      setter.setContact('');
      setter.setTechStacks([{ techStackId: 0 }]);
      setter.setAmount(0);
      setter.setProceedWay('ONLINE');
      setter.setWorkDay(1);
      setter.setTitle('');
      setter.setContent('');
      setter.setEnd(today);
      setter.setPositions([]);
    }
  }, [isFetching, id]);

  return (
    <main className="max-w-max_w m-auto p-20">
      <section>
        <h1 className="text-center text-[2rem] font-bold">
          모집 정보를 입력해주세요
        </h1>
        <ul className="my-20 grid grid-cols-2 gap-x-20">
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
            <Personnel
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
        <TextEditor values={content} setValues={setter.setContent} />
      </section>

      <div className="text-right mt-10">
        <CustomButton className="py-3 px-10 mr-3">취소</CustomButton>
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
      </div>
    </main>
  );
}
