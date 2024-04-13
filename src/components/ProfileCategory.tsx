interface IProfileCategoryProps {
  category: { name: string; type: string }[];
  selectedTab: { type: string; name: string };
  setSelectedTab: (select: { type: string; name: string }) => void;
}
const NAVIGATION = ['내 게시물', '받은 피드백', '내 댓글', '북마크'];
export default function ProfileCategory({
  category,
  selectedTab,
  setSelectedTab,
}: IProfileCategoryProps) {
  const handleTab = (item: { type: string; name: string }) => {
    setSelectedTab(item);
  };
  return (
    <nav className="sticky top-16 w-full border-y bg-white border-gray30 mt-10 z-[1] h-[4.6875rem]">
      <div className="max-w-max_w m-auto flex justify-between items-center mobile:justify-center">
        <ul className="flex text-center">
          {category.map((item, index) => (
            <li
              key={index}
              className="px-2 py-5 mx-10 text-bs_20 cursor-pointer mobile:mx-5">
              <button onClick={() => handleTab(item)}>{item.name}</button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
