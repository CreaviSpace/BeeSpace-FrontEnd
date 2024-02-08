import UserProfileButton from '../button/UserProfileButton';

export default function UserManagement() {
  const trashData = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <section className="w-full p-3">
      <div className="p-3 bg-blue10">
        <div className="grid grid-cols-3 gap-3">
          {trashData.map((item, index) => (
            <div
              key={`${item}-${index}`}
              className="w-fit p-3 flex border border-gray10 bg-white rounded-bs_5">
              <UserProfileButton userName="author" />
              <div className="border-l border-gray10 ml-3 pl-3">
                <p>프론트엔드</p>
                <p>회원가입 | 2023.02.03</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
