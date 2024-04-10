export default function SkeletonCommentCard() {
  return (
    <div className="w-full">
      <div className="flex justify-between mt-10 items-center ">
        <div className="w-10 h-10 bg-[#ECECEC] skeleton-list-item skeleton-list-item"></div>
        <div className="w-14 h-6 bg-[#ECECEC] skeleton-list-item skeleton-list-item"></div>
      </div>
      <div className="max-w-max_w p-7 bg-blue10 mx-auto mt-2 mb-5 flex tablet:rounded-none mobile:rounded-none"></div>
    </div>
  );
}
