import Image from 'next/image';

interface ITechStacksProps {
  techStacks: { techStack: string; iconUrl: string }[];
}
export default function TechStackList({ techStacks }: ITechStacksProps) {
  return (
    <div className="w-1/2">
      <h2 className="font-bold text-bs_18 mb-4">사용 기술</h2>
      <ul className="flex gap-6 max-w-[12.5rem]">
        {techStacks.map((item, index) => (
          <li
            key={`${item.techStack}-${index}`}
            className="flex flex-col items-center">
            <div
              className={`${!item.iconUrl && 'border border-gray10 rounded-full'} w-10 h-10 relative`}>
              {item.iconUrl && (
                <Image
                  key={`recruitDetail-skill-${index}`}
                  fill
                  src={item.iconUrl}
                  alt={item.techStack}
                />
              )}
            </div>
            <span aria-hidden>{item.techStack}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
