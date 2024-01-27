export default function RecruitDetails() {
  const recruitmentDetails = [
    { label: '모집 구분', value: '스터디' },
    { label: '연락 방법', value: '이메일' },
    { label: '모집 인원', value: '5명' },
  ];

  const progressDetails = [
    { label: '진행 방식', value: '온라인' },
    { label: '진행 기간', value: '3개월' },
    { label: '모집 마감', value: '2024-03-01' },
  ];
  return (
    <div className="px-6 pt-2 pb-6 border-b text-bs_18">
      <div className="flex justify-between m-auto">
        <ul className="flex-1">
          {recruitmentDetails.map((detail, index) => (
            <li key={index} className="flex justify-between">
              <div className="flex-1 font-bold">{detail.label}</div>
              <div className="flex-1 ">{detail.value}</div>
            </li>
          ))}
        </ul>
        <ul className="flex-1">
          {progressDetails.map((detail, index) => (
            <li key={index} className="flex justify-between">
              <div className="flex-1 font-bold">{detail.label}</div>
              <div className="flex-1  ">{detail.value}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
