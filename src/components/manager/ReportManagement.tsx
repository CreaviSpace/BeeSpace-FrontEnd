import ReportContent from './ReportContent';

export default function ReportManagement() {
  const trashData = [1, 2, 3];

  const title = [
    '번호',
    '날짜',
    '유형',
    '신고한 계정',
    '신고받은 계정',
    '링크',
    '',
  ];

  return (
    <section className="w-full p-3">
      <table className="p-3 bg-blue10 w-full">
        <tr className="text-left border-y border-black">
          {title.map((item) => (
            <th key={item} className="w-auto p-4">
              {item}
            </th>
          ))}
        </tr>
        {trashData.map((item, index) => (
          <ReportContent key={`${item}-${index}`} />
        ))}
      </table>
    </section>
  );
}
