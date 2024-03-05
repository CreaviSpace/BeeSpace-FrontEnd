import UserProfileButton from '@/components/button/UserProfileButton';

interface IMembersProps {
  positions: {
    position: string;
    members: {
      memberId: number;
      memberProfile: string;
      memberNickname: string;
    }[];
  }[];
}

export default function Members({ positions }: IMembersProps) {
  return (
    <section className="pt-5">
      <h3 className="text-bs_20 font-bold">팀원 소개</h3>
      {positions.map((item, index) => (
        <ul
          key={`${item}-${index}`}
          className="flex items-center ml-8 p-5 border-l-2 border-gray10">
          <li className="min-w-20">{item.position}</li>
          {item.members.map((people, index) => (
            <li key={`${people}-${index}`} className="ml-5">
              <UserProfileButton
                userName={'author'}
                className="border border-gray10 px-4 py-3"
              />
            </li>
          ))}
        </ul>
      ))}
    </section>
  );
}
