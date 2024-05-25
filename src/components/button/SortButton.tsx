import { IoIosArrowDown } from '@react-icons/all-files/io/IoIosArrowDown';
import { useRef, useState } from 'react';
interface ISortButtonProps {
  options: { type: string; name: string }[];
  select: { type: string; name: string };
  setSelect: (select: { type: string; name: string }) => void;
  className?: string;
}
export default function SortButton({
  options,
  select,
  setSelect,
  className,
}: ISortButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const divRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    if (isOpen) {
      divRef.current?.blur();
    } else {
      divRef.current?.focus();
    }
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: { type: string; name: string }) => {
    setSelect(option);
    setIsOpen(false);
  };

  return (
    <div
      className={`${className} flex absolute bg-white px-2 z-[11]`}
      onClick={handleToggle}>
      <div className="text-bs_15 cursor-pointer">
        <div className="flex items-center gap-2 px-2 pb-1">
          <button className="text-start">{select.name}</button>
          <span className={`${isOpen && 'rotate-180 transition-all'}`}>
            <IoIosArrowDown size={20} />
          </span>
        </div>
        <div
          ref={divRef}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setIsOpen(false)}
          tabIndex={0}
          onMouseDown={(e) => e.preventDefault()}>
          {isOpen && (
            <ul className="shadow-md rounded-md">
              {options.map((item, index) => (
                <li key={`${item.type}-${index}`} className="flex flex-col p-1">
                  <button
                    className="text-start"
                    onClick={() => handleSelect(item)}>
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
