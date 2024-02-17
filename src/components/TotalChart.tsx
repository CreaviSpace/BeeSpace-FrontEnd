import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function TotalChart() {
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
      categories: ['MON', 'THE', 'WEN', 'THU', 'FRI', 'SAT', 'SUN'],
    },
    series: [
      {
        name: 'weeks',
        data: [10, 41, 35, 51, 49, 62, 69],
      },
    ],
  };

  return (
    <div id="chart" className="w-full h-full">
      <Chart options={options} series={options.series} height={350} />
    </div>
  );
}
