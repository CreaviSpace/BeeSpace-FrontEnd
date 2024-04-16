interface ISkeletonUniversalCardProps {
  size: 'large' | 'small';
}

const sizeStyles = {
  large: 'w-[56.25rem] h-[12.8125rem]',
  small: 'w-[36.875rem] h-[12.8125rem]',
};

export default function SkeletonUniversalCard({
  size,
}: ISkeletonUniversalCardProps) {
  const boxSize = sizeStyles[size || 'small'];

  return (
    <div
      className={`${boxSize} m-auto rounded-bs_10 flex border border-gary10 tablet:w-[767px] mobile:w-full my-5`}>
      <div className="bg-[#ECECEC] w-[30%] h-full skeleton-list-item"></div>

      <ul className="w-[70%] p-10">
        <li className="w-1/2 py-3 bg-[#ECECEC] skeleton-list-item"></li>
        <li className="w-full py-2 bg-[#ECECEC] mt-3 skeleton-list-item"></li>
        <li className="w-full py-2 bg-[#ECECEC] my-1 skeleton-list-item"></li>
        <li className="w-full py-2 bg-[#ECECEC] skeleton-list-item"></li>
      </ul>
    </div>
  );
}
