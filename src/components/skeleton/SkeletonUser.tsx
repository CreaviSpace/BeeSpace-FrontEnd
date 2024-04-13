export default function SkeletonUser() {
  return (
    <div className="flex items-center w-full">
      <div className="w-10 h-10 rounded-full bg-[#ECECEC] skeleton-list-item"></div>
      <p className="w-20 h-4 ml-2 bg-[#ECECEC] skeleton-list-item"></p>
    </div>
  );
}
