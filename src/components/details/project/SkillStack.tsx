interface ISkillStackProps {
  skill: string[];
}

export default function SkillStack({ skill }: ISkillStackProps) {
  return (
    <section>
      <h3 className="text-bs_20 font-bold">기술 스택</h3>
      <ul className="flex gap-3 ml-8 p-5 border-l-2 border-gray10">
        {skill.map((item, index) => (
          <li
            key={`${item}-${index}`}
            className="w-10 h-10 border border-gray10 rounded-full"></li>
        ))}
      </ul>
    </section>
  );
}
