import SkeletonUser from './SkeletonUser';

export default function SkeletonCommunityCard() {
  return (
    <div className="w-full h-60 py-5 px-7 rounded-bs_5 bg-white border border-gray10 mt-2">
      <div className="pb-2 flex items-center justify-between">
        <SkeletonUser />
        <div className="w-20 h-4 bg-[#f2f2f2]"></div>
      </div>

      <hr className="w-full m-auto" aria-hidden />

      <div className="mt-3">
        <p className="w-full py-2 mb-3 bg-[#f2f2f2]"></p>
        <p className="w-full py-2 mb-3 bg-[#f2f2f2]"></p>
        <p className="w-1/2 py-2 mb-3 bg-[#f2f2f2]"></p>
      </div>
    </div>
  );
}
