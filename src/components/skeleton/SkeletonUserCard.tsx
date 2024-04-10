import SkeletonUser from './SkeletonUser';

export default function SkeletonUserCard() {
  return (
    <div className="flex items-center w-full border-1 border-[#ECECEC] bg-white p-3 m-auto">
      <div className="border-r border-[#ECECEC] flex items-center pr-2">
        <SkeletonUser />
      </div>

      <div>
        <p className="w-20 h-4 ml-2 bg-[#ECECEC] mb-1 skeleton-list-item"></p>
        <p className="w-24 h-4 ml-2 bg-[#ECECEC] skeleton-list-item"></p>
      </div>
    </div>
  );
}
