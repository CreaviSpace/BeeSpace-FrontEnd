import { parseValue } from '@/utils/parseValue';

import RecruitContactLink from './RecruitContactLink';

interface IRecruitDetailsProps {
  category: string;
  contactWay: string;
  contact: string;
  amount: string;
  proceedWay: string;
  workDay: string;
  end: string;
}
export default function RecruitDetails({
  category,
  contactWay,
  contact,
  amount,
  proceedWay,
  workDay,
  end,
}: IRecruitDetailsProps) {
  const recruitmentDetails = [
    {
      label: '모집 구분',
      value: parseValue(category),
    },
    {
      label: '연락 방법',
      value: parseValue(contactWay),
    },
    { label: '모집 인원', value: `${amount}명` },
  ];

  const progressDetails = [
    {
      label: '진행 방식',
      value: parseValue(proceedWay),
    },
    { label: '진행 기간', value: `${workDay}개월` },
    { label: '모집 마감', value: end },
  ];

  return (
    <div className="px-6 pt-2 pb-6 border-b text-bs_18">
      <div className="flex justify-between m-auto mobile:flex-col">
        <ul className="flex-1">
          {recruitmentDetails.map((item, index) => (
            <li key={index} className="flex justify-between mt-2">
              <div className="flex-1 mobile:flex-[2] font-bold">
                {item.label}
              </div>
              {item.label === '연락 방법' ? (
                <RecruitContactLink contact={contact} contactWay={item.value} />
              ) : (
                <div className="flex-1">{item.value}</div>
              )}
            </li>
          ))}
        </ul>
        <ul className="flex-1">
          {progressDetails.map((item, index) => (
            <li key={index} className="flex justify-between mt-2">
              <div className="flex-1 mobile:flex-[2] font-bold">
                {item.label}
              </div>
              <div className="flex-1">{item.value}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
