import Link from 'next/link';

interface IMoblieCategoryProps {
  menu: { name: string; link: string }[];
}

export default function MoblieCategory({ menu }: IMoblieCategoryProps) {
  return (
    <ul className="absolute top-[4rem] left-0 w-full h-screen shadow-md ">
      {menu.map((item) => (
        <li key={item.name} className="bg-[#F5F5F5] border-b border-gray10">
          <Link
            href={item.link}
            className="p-5 text-center block hover:text-primary">
            {item.name}
          </Link>
        </li>
      ))}
      <div className=" h-full bg-black/50 w-full cursor-pointer"></div>
    </ul>
  );
}
