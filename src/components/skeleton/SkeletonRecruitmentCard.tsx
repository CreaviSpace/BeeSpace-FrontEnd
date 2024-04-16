export default function SkeletonRecruitmentCard() {
  return (
    <div className="w-full h-[17.8125rem] bg-white border border-gray10 rounded-bs_10 py-8 px-5">
      <div className="w-1/2 p-3 bg-[#ECECEC] skeleton-list-item"></div>
      <p className="w-full pb-3 bg-[#ECECEC] mt-3 skeleton-list-item"></p>
      <p className="w-full pb-3 bg-[#ECECEC] mt-3 skeleton-list-item"></p>
      <p className="w-full pb-3 bg-[#ECECEC] mt-3 skeleton-list-item"></p>
    </div>
  );
}
