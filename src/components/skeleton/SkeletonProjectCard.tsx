export default function SkeletonProjectCard() {
  return (
    <div className="max-w-md w-full m-auto h-[23.75rem] border border-gray10 rounded-b-bs_20">
      <div className="w-full h-[11.25rem] bg-[#f2f2f2]"></div>

      <div className="w-full h-fit p-5 rounded-b-bs_20">
        <h3 className="bg-[#f2f2f2] pb-6 mt-5"></h3>
        <p className={`bg-[#f2f2f2] pb-3 mt-5`}></p>
        <p className={`bg-[#f2f2f2] pb-3 mt-1`}></p>
        <p className={`bg-[#f2f2f2] w-1/2 pb-3 mt-1`}></p>
      </div>
    </div>
  );
}
