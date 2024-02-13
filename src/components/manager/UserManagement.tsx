import UserManagementButton from '../button/UserManagementButton';

export default function UserManagement() {
  const trashData = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <section className="w-full p-3">
      <div className="p-3 bg-blue10">
        <div className="grid grid-cols-3 gap-3 tablet:grid-cols-2 mobile:grid-cols-1">
          {trashData.map((item, index) => (
            <UserManagementButton key={`${item}-${index}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
