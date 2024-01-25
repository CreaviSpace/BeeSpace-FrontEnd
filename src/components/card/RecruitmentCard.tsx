import Bookmark from '../button/Bookmark';

interface IRecruitmentCardProps {
  title: string;
  content: string;
  skill: string[];
  people: { position: string; people: number };
}

export default function RecruitmentCard({
  title,
  content,
  skill,
  people,
}: IRecruitmentCardProps) {
  return (
    <div className="relative w-full h-[17.8125rem] border border-gray10 rounded-bs_10 py-8 px-5 overflow-hidden">
      <Bookmark size={35} className="absolute -top-[0.375rem] right-5" />
      <h3 className="text-bs_18 pb-3 font-bold">{title}</h3>
      <p className="overflow-hidden text-ellipsis break-keep line-clamp-3">
        {content}
      </p>
      <ul className="flex py-6 gap-3">
        {skill.map((item) => (
          <li
            key={item}
            className="w-10 h-10 rounded-full border border-gray10 flex justify-center items-center"></li>
        ))}
      </ul>
      <div>모집인원 ({people.people}/1)</div>
    </div>
  );
}
