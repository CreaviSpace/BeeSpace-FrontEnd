import { useState } from 'react';

interface IProfileCategoryProps {
  category: { name: string; type: string }[];
  selectedTab: { type: string; name: string };
  setSelectedTab: (select: { type: string; name: string }) => void;
}
export default function ProfileCategory({
  category,
  selectedTab,
  setSelectedTab,
}: IProfileCategoryProps) {
  const [isToggle, setIsToggle] = useState(true);
  const [selectMenu, setSelectMenu] = useState('내 게시물');

  const handleSelectTab = (item: { type: string; name: string }) => {
    setSelectedTab(item);
    setSelectMenu(item.name);
  };

  const handleToggleMemu = () => {
    setIsToggle(!isToggle);
  };

  return (
    <nav className="sticky top-16 w-full border-y bg-white border-gray30 mt-10 z-[10]">
      <div className="max-w-4xl m-auto flex justify-between items-center mobile:justify-center">
        <ul className="w-full flex mobile:flex-col text-center  mobile:gap-3">
          <li className="hidden mobile:block">
            <button
              className="text-bs_20 w-full py-5 border-b border-gray30"
              onClick={() => {
                handleToggleMemu();
                isToggle && handleSelectTab;
              }}>
              {selectMenu}
            </button>
          </li>
          {category.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                handleSelectTab(item);
                handleToggleMemu();
              }}
              className={`${isToggle && 'mobile:hidden'} text-bs_20`}>
              <button
                className={`w-[8.75rem] h-[4.6875rem] ${selectedTab.type === item.type && 'border-b-[3px] border-primary'} mobile:w-full mobile:py-5`}>
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
