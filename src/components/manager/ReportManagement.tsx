import { useState } from 'react';

import useGetInfiniteAdminReports from '@/hooks/queries/admin/useGetInfiniteAdminReports';
import { IReportType } from '@/types/global';

import ReportContent from './ReportContent';

const SIZE = 1000;
const TYPE = 'reports';

export default function ReportManagement() {
  const [sorting, setSorting] = useState('DESC');

  const { isLoading, data } = useGetInfiniteAdminReports(SIZE, sorting, TYPE);

  return (
    <section className="w-full min-w-min_w p-3">
      <div className="bg-blue10 w-full">
        <ul className="text-left border-t border-black flex">
          <li className="w-[25%] p-4">번호</li>
          <li className="w-[25%] p-4 mobile:hidden">날짜</li>
          <li className="w-[25%] p-4 mobile:w-[50%]">유형</li>
        </ul>
      </div>
      {isLoading
        ? null
        : data?.pages.map((page) => {
            return page.map((item: IReportType, index: number) => (
              <ReportContent key={`${index}`} item={item} />
            ));
          })}
    </section>
  );
}
