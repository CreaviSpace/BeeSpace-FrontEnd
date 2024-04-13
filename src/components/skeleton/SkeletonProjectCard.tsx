export default function SkeletonProjectCard() {
  return (
    <div className="max-w-md w-full m-auto h-[23.75rem] border border-gray10 rounded-b-bs_20">
      <div className="w-full h-[11.25rem] bg-[#ECECEC] skeleton-list-item"></div>

      <div className="w-full h-fit p-5 rounded-b-bs_20">
        <h3 className="bg-[#ECECEC] pb-6 mt-5 skeleton-list-item"></h3>
        <p className={`bg-[#ECECEC] pb-3 mt-5 skeleton-list-item`}></p>
        <p className={`bg-[#ECECEC] pb-3 mt-1 skeleton-list-item`}></p>
        <p className={`bg-[#ECECEC] w-1/2 pb-3 mt-1 skeleton-list-item`}></p>
      </div>
    </div>
  );
}
