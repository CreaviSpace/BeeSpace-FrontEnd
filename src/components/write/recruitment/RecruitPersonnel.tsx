/* eslint-disable no-unused-vars */
import { FaPlusCircle } from '@react-icons/all-files/fa/FaPlusCircle';
import { useEffect, useState } from 'react';

import SelectButton from '@/components/button/SelectButton';
import { parseValue } from '@/utils/parseValue';

import { parseEnum } from '../../../utils/parseEnum';

const OPTIONNUM = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

interface IPersonnelProps {
  amount: number;
  setAmount: (amount: number) => void;
  positions: { position: string; amount: number; now: number; id?: number }[];
  setPositions: (
    positions: {
      position: string;
      amount: number;
      now: number;
    }[]
  ) => void;
}
export default function RecruitPersonnel({
  amount,
  setAmount,
  positions,
  setPositions,
}: IPersonnelProps) {
  const [personnel, setPersonnel] = useState<string[]>(['default', 'default']);
  const [personnelNum, setPersonnelNum] = useState<number[]>([1, 1]);
  const [option, setOption] = useState([
    '디자인',
    '프론트엔드',
    '백엔드',
    '기획',
  ]);

  useEffect(() => {
    const newPersonnel = personnel.map((_, index) => {
      return {
        position: parseEnum(personnel[index]),
        amount: personnelNum[index],
        now: 0,
      };
    });
    setPositions(newPersonnel);
  }, [personnel, personnelNum]);

  useEffect(() => {
    const totalAmount = personnelNum.reduce((a, b) => a + b);
    setAmount(totalAmount);
  }, [personnelNum]);

  useEffect(() => {
    if (positions.length !== 0) {
      const newPositions = positions.map((item) => {
        return parseValue(item.position);
      });
      const newAmount = positions.map((item) => {
        return item.amount;
      });
      setPersonnel(newPositions);
      setPersonnelNum(newAmount);
    }
  }, [amount]);

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
        <div
          className="flex min_mobile:flex-col mobile:mb-4"
          key={`${item}-${index}`}>
          <SelectButton
            option={option}
            setOption={setOption as (option: (string | number)[]) => void}
            select={personnel}
            setSelect={setPersonnel as (personnel: (string | number)[]) => void}
            index={index}
            className="desktop:w-2/3 tablet:w-2/3"
          />
          <SelectButton
            option={OPTIONNUM}
            select={personnelNum}
            setSelect={
              setPersonnelNum as (personnel: (string | number)[]) => void
            }
            index={index}
            handler={handlePersonnelDelete}
            className="bg-primary border-none desktop:w-1/3 tablet:w-1/3"
          />
        </div>
      ))}
    </>
  );
}
