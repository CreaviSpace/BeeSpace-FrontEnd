import Link from 'next/link';

interface IMoblieCategoryProps {
  menu: { name: string; link: string }[];
  handleMenuToggle: () => void;
}

export default function MoblieCategory({
  menu,
  handleMenuToggle,
}: IMoblieCategoryProps) {
  return (
    <ul className="absolute top-[4rem] left-0 w-full h-screen shadow-md hidden mobile:block">
      {menu.map((item) => (
        <li key={item.name} className="bg-[#F5F5F5] border-b border-gray10">
          <Link
            href={item.link}
            className="p-5 text-center block hover:text-primary"
            onClick={handleMenuToggle}>
            {item.name}
          </Link>
        </li>
      ))}
      <div
        className="h-screen bg-black/50 w-full cursor-pointer"
        onClick={handleMenuToggle}></div>
    </ul>
  );
}
