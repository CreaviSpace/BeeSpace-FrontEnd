interface ITechStacksProps {
  techStacks: { techStackId: number; techStack: string; iconUrl: string }[];
}
export default function TechStackList({ techStacks }: ITechStacksProps) {
  return (
    <div className="w-1/2">
      <h2 className="font-bold text-bs_18 mb-4">사용 기술</h2>
      <ul className="flex gap-6 max-w-[12.5rem]">
        {techStacks.map((item) => (
          <li className="flex flex-col" key={`recruitDetail-skill-${item}`}>
            <div className="border border-gray20 rounded-full  w-fit h-fit">
              {/* <Image
                src={item.iconUrl}
                alt={item.techStack}
                width={40}
                height={40}
              /> */}
            </div>
            <div className="border w-10 h-10 border-gray20 rounded-full"></div>
            <span aria-hidden>{item.techStack}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
