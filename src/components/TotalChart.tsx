import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

import useGetAdminStatist from '@/hooks/queries/admin/useGetAdminStatist';

import Deadline from './write/recruitment/Deadline';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const DATE_LIST = [
  { title: '일', link: 'daily' },
  { title: '월', link: 'monthly' },
  { title: '년', link: 'yearly' },
];

const TODAY = new Date().toString();

interface ITotalChartProps {
  category: string;
}

export default function TotalChart({ category }: ITotalChartProps) {
  const [end, setEnd] = useState<string>(TODAY);
  const [date, setDate] = useState('monthly');
  const [xaxis, setXaxis] = useState<number[]>([]);
  const [series, setSeries] = useState<number[]>([]);

  const handleDate = (date: string) => {
    switch (date) {
      case 'yearly':
        return `${category}`;
      case 'monthly':
        return `${category}&year=${end.split('-')[0]}`;
      case 'daily':
        return `${category}&year=${end.split('-')[0]}&month=${end.split('-')[1]}`;
      default:
        return '';
    }
  };

  const { isLoading, data, isFetching } = useGetAdminStatist(
    date,
    handleDate(date)
  );

  useEffect(() => {
    if (!isLoading && data && data.length !== 0) {
      if (data[0].day) {
        const xaxisLength = Array.from(
          { length: data[data.length - 1].day },
          (_, index) => index + 1
        );
        setXaxis(xaxisLength);

        const seriesLength = Array.from(
          { length: data[data.length - 1].day },
          (_) => 0
        );

        data.map(
          (item: {
            year: number;
            month: number;
            day: number;
            count: number;
          }) => {
            seriesLength[item.day - 1] = item.count;
          }
        );
        setSeries(seriesLength);
      } else if (data[0].month) {
        const xaxisLength = Array.from(
          { length: data[data.length - 1].month },
          (_, index) => index + 1
        );
        setXaxis(xaxisLength);

        const seriesLength = Array.from(
          { length: data[data.length - 1].month },
          (_) => 0
        );

        data.map((item: { year: number; month: number; count: number }) => {
          seriesLength[item.month - 1] = item.count;
        });
        setSeries(seriesLength);
      } else if (data[0].year) {
        const xaxisLength = Array.from(
          { length: data.length + 1 },
          (_, index) => {
            if (index === 0) {
              return 0;
            } else {
              return data[index - 1].year;
            }
          }
        );
        setXaxis(xaxisLength);

        const seriesLength = Array.from({ length: data.length + 1 }, (_) => 0);

        data.map((item: { year: number; count: number }, index: number) => {
          seriesLength[index + 1] = item.count;
        });
        setSeries(seriesLength);
      }
    } else {
      setXaxis([]);
      setSeries([]);
    }
  }, [isLoading, isFetching, date]);

  const options: ApexOptions = {
    chart: {
      type: 'line',
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'straight',
    },
    title: {
      text: '사용자 총량',
      align: 'center',
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: xaxis,
    },
    series: [
      {
        name: 'weeks',
        data: series,
      },
    ],
  };

  return (
    <div id="chart" className="w-full h-full relative">
      <Deadline end={end} setEnd={setEnd} hidden disable={date === 'yearly'} />
      <Chart options={options} series={options.series} />
      <ul className="flex justify-around items-center h-fit text-center">
        {DATE_LIST.map((item, index) => (
          <li
            className={`py-1 w-full ${date === item.link && 'text-primary'} cursor-pointer`}
            key={index}
            onClick={() => setDate(item.link)}>
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
