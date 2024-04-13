export default function SkeletonProfile() {
  return (
    <div className="w-screen-md m-auto mt-[4rem]">
      <div className="w-[22.4375rem] m-auto flex flex-col items-center gap-y-1">
        <div className="w-[100px] h-[100px] rounded-full bg-[#f2f2f2]"></div>
        <div className="mt-4 mb-1 w-20 h-6 bg-[#f2f2f2]"></div>
        <div className="w-16 h-4 bg-[#f2f2f2]"></div>
        <div className="mt-2 w-28 h-5 bg-[#f2f2f2]"></div>
        <div className="mt-2 w-64 h-10 bg-[#f2f2f2]"></div>
      </div>
    </div>
  );
}
