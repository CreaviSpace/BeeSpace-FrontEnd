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
      <div className="bg-[#f2f2f2] w-[30%] h-full"></div>

      <ul className="w-[70%] p-10">
        <li className="w-1/2 py-3 bg-[#f2f2f2]"></li>
        <li className="w-full py-2 bg-[#f2f2f2] mt-3"></li>
        <li className="w-full py-2 bg-[#f2f2f2] my-1"></li>
        <li className="w-full py-2 bg-[#f2f2f2]"></li>
      </ul>
    </div>
  );
}
