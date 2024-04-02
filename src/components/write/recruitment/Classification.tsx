import OnoffButton from '@/components/button/OnOffButton';

interface IClassificationProps {
  category: string;
  setCategory: (category: string) => void;
}
export default function Classification({
  category,
  setCategory,
}: IClassificationProps) {
  const recruitmentList = [
    { key: 'PROJECT_RECRUIT', name: '프로젝트' },
    { key: 'STUDY', name: '스터디' },
  ];

  return (
    <>
      <h2 className="text-bs_20 my-5">모집 분류</h2>
      <OnoffButton
        value={category}
        setValue={setCategory}
        list={recruitmentList}
      />
    </>
  );
}
