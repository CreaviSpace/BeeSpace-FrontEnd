import { FaPlusCircle } from '@react-icons/all-files/fa/FaPlusCircle';
import { useState } from 'react';

import CustomSelect from '@/components/button/CustomSelect';

export default function Personnel() {
  const [personnel, setPersonnel] = useState<string[]>(['default', 'default']);
  const [personnelNum, setPersonnelNum] = useState<number[]>([1, 1]);
  const [option, setOption] = useState([
    '백엔드',
    '프론트엔드',
    '디자이너',
    '기획',
  ]);
  const [optionNum] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

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
    <>
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
            select={personnel}
            setSelect={setPersonnel as (personnel: (string | number)[]) => void}
            index={index}
          />
          <CustomSelect
            option={optionNum}
            select={personnelNum}
            setSelect={
              setPersonnelNum as (personnel: (string | number)[]) => void
            }
            index={index}
            handler={handlePersonnelDelete}
            className="bg-primary border-none"
          />
        </div>
      ))}
    </>
  );
}
