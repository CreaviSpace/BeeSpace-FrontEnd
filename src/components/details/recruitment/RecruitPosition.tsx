import CustomButton from '@/components/button/CustomButton';
import useRecruitDetail from '@/hooks/useRecruitDetail';
import { IPositionsType } from '@/types/global';

interface RecruitPosition {
  id: string;
}

export default function RecruitPosition({ id }: RecruitPosition) {
  const { isLoading, data } = useRecruitDetail(id);

  return (
    <div className="w-1/2 mr-8">
      <h2 className="font-bold text-bs_18 mb-4">모집 포지션</h2>
      <ul className="flex justify-between">
        <li className="w-full">
          {data?.positions.map((item: IPositionsType, index: number) => (
            <div key={`${index}`} className="flex justify-between items-center">
              <div className="flex-1">{item.position}</div>
              <div className="flex-1">{`${item.now}/${item.amount}`}</div>
              <CustomButton
                // onClick={() => handleApplicant()}
                className={`mt-1 w-24 h-8 ${item.now === item.amount ? 'bg-yellow-400 border-transparent' : ''}`}>
                {item.amount === item.now ? '완료' : '지원하기'}
              </CustomButton>
            </div>
          ))}
        </li>
      </ul>
    </div>
  );
}
