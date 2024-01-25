import { FaPlusCircle } from '@react-icons/all-files/fa/FaPlusCircle';
import dynamic from 'next/dynamic';
import { useState } from 'react';

import CustomSelect from '../button/CustomSelect';
import OnOffButton from '../button/OnOffButton';
import TitleEditor from '../TextEditor/TitleEditor';

const TextEditor = dynamic(
  () => import('@/components/TextEditor/TextEditor').then((mod) => mod.default),
  { ssr: false }
);

export default function RecruitmentWrite() {
  const [recruitment, setRecruitment] = useState('project');
  const [onoffLine, setOnoffLine] = useState('on');
  const [personnel, setPersonnel] = useState<string[]>(['default', 'default']);
  const [personnelNum, setPersonnelNum] = useState<number[]>([1, 1]);
  const [option, setOption] = useState([
    '백엔드',
    '프론트엔드',
    '디자이너',
    '기획',
  ]);
  const [optionNum] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const recruitmentList = [
    { key: 'project', name: '프로젝트' },
    { key: 'study', name: '스터디' },
  ];
  const onoffList = [
    { key: 'on', name: '온라인' },
    { key: 'off', name: '오프라인' },
    { key: 'on/off', name: '온라인/오프라인' },
  ];

  const handlePersonnelPlus = () => {
    if (personnel.length < 4) {
      setPersonnel([...personnel, `default`]);
      setPersonnelNum([...personnelNum, 1]);
    }
  };

  const handlePersonnelDelete = (num: number) => {
    const copyOption = [...option, personnel[num]];
    setOption(copyOption);
    const copyPersonnel = personnel.filter((prev, index) => index !== num);
    setPersonnel(copyPersonnel);
    const copyPersonnelNum = personnelNum.filter(
      (prev, index) => index !== num
    );
    setPersonnelNum(copyPersonnelNum);
  };

  return (
    <div className="max-w-max_w m-auto p-20">
      <h1 className="text-center text-[2rem] font-bold">
        모집 정보를 입력해주세요
      </h1>

      <section>
        <ul className="my-20 grid grid-cols-2 gap-x-10">
          <li className="w-full">
            <h2 className="text-bs_20 my-5">모집 분류</h2>
            <OnOffButton
              value={recruitment}
              setValue={setRecruitment}
              list={recruitmentList}
            />
          </li>
          <li className="w-full">
            <h2 className="text-bs_20 my-5">진행 방식</h2>
            <OnOffButton
              value={onoffLine}
              setValue={setOnoffLine}
              list={onoffList}
            />
          </li>
          <li className="w-full">
            <div className="flex justify-between items-center">
              <h2 className="text-bs_20 my-5">모집 인원</h2>
              {personnel.length < 4 && (
                <span
                  className="flex items-center gap-2"
                  onClick={handlePersonnelPlus}>
                  <FaPlusCircle color={'#0099DB'} size={27} />
                  인원 추가
                </span>
              )}
            </div>
            {personnel.map((item, index) => (
              <div className="flex" key={`${item}-${index}`}>
                <CustomSelect
                  option={option}
                  setOption={setOption as (option: (string | number)[]) => void}
                  personnel={personnel}
                  setPersonnel={
                    setPersonnel as (personnel: (string | number)[]) => void
                  }
                  index={index}
                />
                <CustomSelect
                  option={optionNum}
                  personnel={personnelNum}
                  setPersonnel={
                    setPersonnelNum as (personnel: (string | number)[]) => void
                  }
                  index={index}
                  handler={handlePersonnelDelete}
                  className="w-3/12"
                />
              </div>
            ))}
          </li>
          <li>
            <h2 className="text-bs_20 my-5">기술 스택</h2>
          </li>
        </ul>
      </section>
      <section>
        <TitleEditor />
        <TextEditor />
      </section>
    </div>
  );
}
