import SkeletonUser from './SkeletonUser';

export default function SkeletonDetail() {
  return (
    <div className="max-w-max_w m-auto py-10 px-16">
      <div className="w-full h-fit flex flex-col items-center max-w-max_w m-auto">
        <div className="w-20 p-3 bg-[#f2f2f2]"></div>
        <div className="w-40 p-3 mt-3 bg-[#f2f2f2]"></div>
        <div className="max-w-max_w flex items-center justify-between w-full px-4 py-2">
          <SkeletonUser />
        </div>
      </div>
      <hr className="w-full border border-[#f2f2f2]" />

      <div className="py-8 border-b border-[#f2f2f2]">
        <p className="w-20 h-10 bg-[#f2f2f2] mb-3"></p>
        <p className="w-full h-5 bg-[#f2f2f2] mb-3"></p>
        <p className="w-full h-5 bg-[#f2f2f2] mb-10"></p>
        <p className="w-20 h-10 bg-[#f2f2f2] mb-3"></p>
        <p className="w-full h-5 bg-[#f2f2f2] mb-3"></p>
        <p className="w-full h-5 bg-[#f2f2f2] mb-3"></p>
        <p className="w-1/2 h-5 bg-[#f2f2f2] mb-3"></p>

        <div className="w-full h-80 bg-[#f2f2f2] mt-10"></div>
      </div>
    </div>
  );
}
