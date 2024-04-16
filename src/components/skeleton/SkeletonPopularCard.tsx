export default function SkeletonPopularCard() {
  return (
    <div className="w-[550px] p-[0.1px] mx-auto mb-auto overflow-x-hidden tablet:w-[767px] min_mobile:w-[330px]">
      <div
        className={`relative right-0 my-5 h-80 w-[34.375rem] tablet:w-[47.9375rem] tablet:h-[27.875rem] min_mobile:w-[20.625rem]  min_mobile:h-[11.625rem] p-1 rounded-bs_10 bg-[#ECECEC] skeleton-list-item`}></div>
      <div
        className={`relative right-0 my-5 h-80 w-[34.375rem] tablet:w-[47.9375rem] tablet:h-[27.875rem] min_mobile:w-[20.625rem]  min_mobile:h-[11.625rem] p-1 rounded-bs_10 bg-[#ECECEC] skeleton-list-item`}></div>
    </div>
  );
}
