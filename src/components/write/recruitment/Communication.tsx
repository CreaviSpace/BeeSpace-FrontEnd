import { useEffect, useState } from 'react';

import SelectButton from '@/components/button/SelectButton';
import { parseEnum } from '@/utils/parseEnum';
import { parseValue } from '@/utils/parseValue';
interface ICommunicationProps {
  contact: string;
  setContact: (contact: string) => void;
  contactWay: string;
  setContactWay: (contactWay: string) => void;
}
export default function Communication({
  contact,
  contactWay,
  setContact,
  setContactWay,
}: ICommunicationProps) {
  const [communication, setCommunication] = useState(['default']);
  const [option] = useState(['구글폼', '오픈톡', '이메일']);

  useEffect(() => {
    const newCommunication = parseEnum(communication[0]);

    setContactWay(newCommunication);
  }, [communication]);

  useEffect(() => {
    setCommunication([parseValue(contactWay)]);
  }, [contactWay]);
  return (
    <div>
      <h2 className="text-bs_20 my-5">연락 방법</h2>
      <SelectButton
        option={option}
        select={communication}
        setSelect={setCommunication as (personnel: (string | number)[]) => void}
        index={0}
      />
      {communication[0] !== 'default' && (
        <input
          type="text"
          placeholder={`${communication[0]} 링크`}
          className="w-full h-[3.125rem] px-5 border border-gary10 rounded-bs_5"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
      )}
    </div>
  );
}
