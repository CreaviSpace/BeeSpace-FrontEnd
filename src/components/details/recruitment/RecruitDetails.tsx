import Link from 'next/link';

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
    { label: '모집 구분', value: category },
    {
      label: '연락 방법',
      value: contact.includes('https://docs.google.com/forms/')
        ? '구글폼'
        : contact.includes('https://open.kakao.com/')
          ? '오픈카톡'
          : contactWay,
      className: 'underline underline-offset-2 decoration-gray-400',
    },
    { label: '모집 인원', value: `${amount}명` },
  ];

  const progressDetails = [
    { label: '진행 방식', value: proceedWay },
    { label: '진행 기간', value: `${workDay}개월` },
    { label: '모집 마감', value: end },
  ];

  return (
    <div className="px-6 pt-2 pb-6 border-b text-bs_18">
      <div className="flex justify-between m-auto">
        <ul className="flex-1">
          {recruitmentDetails.map((item, index) => (
            <li key={index}>
              <div className="flex justify-between">
                <div className="flex-1 font-bold">{item.label}</div>
                {item.label === '연락 방법' ? (
                  <div className={`flex-1 ${item.className}`}>
                    <Link
                      href={contact}
                      target="_blank"
                      rel="noopener noreferrer">
                      {item.value}
                    </Link>
                  </div>
                ) : (
                  <div className={`flex-1`}>{item.value}</div>
                )}
              </div>
            </li>
          ))}
        </ul>
        <ul className="flex-1">
          {progressDetails.map((item, index) => (
            <li key={index} className="flex justify-between">
              <div className="flex-1 font-bold">{item.label}</div>
              <div className="flex-1">{item.value}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
