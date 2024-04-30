import Link from 'next/link';

interface IMoblieCategoryProps {
  menu: { name: string; link: string }[];
  setIsMCategoryVisible: (toggle: boolean) => void;
}

export default function MoblieNavigation({
  menu,
  setIsMCategoryVisible,
}: IMoblieCategoryProps) {
  return (
    <ul className="absolute top-[4rem] left-0 w-full h-screen shadow-md hidden mobile:block">
      {menu.map((item) => (
        <li key={item.name} className="bg-[#F5F5F5] border-b border-gray10">
          <Link
            href={item.link}
            className="p-5 text-center block hover:text-primary"
            onClick={() => setIsMCategoryVisible(false)}>
            {item.name}
          </Link>
        </li>
      ))}
      <div
        className="h-screen bg-black/50 w-full cursor-pointer"
        onClick={() => setIsMCategoryVisible(false)}></div>
    </ul>
  );
}
