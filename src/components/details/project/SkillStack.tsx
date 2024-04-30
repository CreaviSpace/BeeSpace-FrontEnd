import Image from 'next/image';

interface ISkillStackProps {
  techStacks: { techStack: string; iconUrl: string }[];
}

export default function SkillStack({ techStacks }: ISkillStackProps) {
  return (
    <section>
      <h3 className="text-bs_20 font-bold">기술 스택</h3>
      <ul className="flex gap-3 ml-8 p-5 border-l-2 border-gray10">
        {techStacks.map((item, index) => (
          <li
            key={`${item.techStack}-${index}`}
            className="flex flex-col items-center">
            <div
              className={`relative w-10 h-10 rounded-full ${!item.iconUrl && 'border border-gray10 '}`}>
              {item.iconUrl && (
                <Image src={item.iconUrl} alt="아이콘 이미지" fill />
              )}
            </div>
            <p>{item.techStack}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
