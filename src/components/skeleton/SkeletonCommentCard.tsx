export default function SkeletonCommentCard() {
  return (
    <div className="w-full">
      <div className="flex justify-between mt-10 items-center">
        <div className="w-10 h-10 bg-blue10 rounded-full"></div>
        <div className="w-14 h-6 bg-blue10 rounded-md"></div>
      </div>
      <div className="max-w-max_w p-7 bg-blue10 rounded-bs_20 mx-auto mt-2 mb-5 flex tablet:rounded-none mobile:rounded-none"></div>
    </div>
  );
}
