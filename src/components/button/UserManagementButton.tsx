import UserProfileButton from './UserProfileButton';

export default function UserManagementButton() {
  return (
    <div className="w-fit p-3 flex m-auto border border-gray10 bg-white rounded-bs_5 tablet:w-full mobile:w-full">
      <UserProfileButton userName="author" />
      <div className="border-l border-gray10 ml-3 pl-3">
        <p>프론트엔드</p>
        <p>회원가입 | 2023.02.03</p>
      </div>
    </div>
  );
}
