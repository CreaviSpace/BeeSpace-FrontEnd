import UserProfileButton from '@/components/button/UserProfileButton';
import { parseValue } from '@/utils/parseValue';

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
        <div
          key={item.position}
          className="flex ml-8 p-5 border-l-2 border-gray10 min_mobile:flex-col">
          <strong className="min-w-20">{parseValue(item.position)}</strong>
          <ul
            key={`${item}-${index}`}
            className="flex items-center justify-start flex-wrap gap-2 ml-5 min_mobile:ml-2 mobile:mt-2">
            {item.members.map((people, index) => (
              <li key={`${people}-${index}`}>
                <UserProfileButton
                  userName={'author'}
                  className="border border-gray10 px-4 py-3"
                />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
