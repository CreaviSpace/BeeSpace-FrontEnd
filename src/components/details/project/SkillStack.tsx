interface ISkillStackProps {
  techStacks: { techStackId: number; techStack: string; iconUrl: string }[];
}

export default function SkillStack({ techStacks }: ISkillStackProps) {
  return (
    <section>
      <h3 className="text-bs_20 font-bold">기술 스택</h3>
      <ul className="flex gap-3 ml-8 p-5 border-l-2 border-gray10">
        {techStacks.map((item) => (
          <li
            key={`${item.techStackId}`}
            className="flex flex-col items-center">
            <div className="w-10 h-10 border border-gray10 rounded-full">
              {/* {item.iconUrl} */}
            </div>
            <p>{item.techStack}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
