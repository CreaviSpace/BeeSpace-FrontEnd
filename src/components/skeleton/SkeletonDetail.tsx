import SkeletonUser from './SkeletonUser';

export default function SkeletonDetail() {
  return (
    <div className="max-w-max_w m-auto py-10 px-16">
      <div className="w-full h-fit flex flex-col items-center max-w-max_w m-auto">
        <div className="w-20 p-3 bg-[#ECECEC] skeleton-list-item"></div>
        <div className="w-40 p-3 mt-3 bg-[#ECECEC] skeleton-list-item"></div>
        <div className="max-w-max_w flex items-center justify-between w-full px-4 py-2">
          <SkeletonUser />
        </div>
      </div>
      <hr className="w-full border border-[#ECECEC]" />

      <div className="py-8 border-b border-[#ECECEC]">
        <p className="w-20 h-10 bg-[#ECECEC] mb-3 skeleton-list-item"></p>
        <p className="w-full h-5 bg-[#ECECEC] mb-3 skeleton-list-item"></p>
        <p className="w-full h-5 bg-[#ECECEC] mb-10 skeleton-list-item"></p>
        <p className="w-20 h-10 bg-[#ECECEC] mb-3 skeleton-list-item"></p>
        <p className="w-full h-5 bg-[#ECECEC] mb-3 skeleton-list-item"></p>
        <p className="w-full h-5 bg-[#ECECEC] mb-3 skeleton-list-item"></p>
        <p className="w-1/2 h-5 bg-[#ECECEC] mb-3 skeleton-list-item"></p>

        <div className="w-full h-80 bg-[#ECECEC] mt-10 skeleton-list-item"></div>
      </div>
    </div>
  );
}
