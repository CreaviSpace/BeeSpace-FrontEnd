import UserProfileButton from '@/components/button/UserProfileButton';

interface IMembersProps {
  personnel: { personnel: string; people: { name: string }[] }[];
}

export default function Members({ personnel }: IMembersProps) {
  return (
    <section className="pt-5">
      <h3 className="text-bs_20 font-bold">팀원 소개</h3>
      {personnel.map((item, index) => (
        <ul
          key={`${item}-${index}`}
          className="flex items-center ml-8 p-5 border-l-2 border-gray10">
          <li className="min-w-20">{item.personnel}</li>
          {item.people.map((people, index) => (
            <li key={`${people}-${index}`} className="ml-5">
              <UserProfileButton
                userName={people.name}
                className="border border-gray10 px-4 py-3"
              />
            </li>
          ))}
        </ul>
      ))}
    </section>
  );
}
