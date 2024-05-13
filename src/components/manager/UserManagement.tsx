import { IoEllipsisHorizontalSharp } from '@react-icons/all-files/io5/IoEllipsisHorizontalSharp';
import { useState } from 'react';

import useAdmin from '@/hooks/queries/admin/useAdmin';
import useUserStanctionModal from '@/store/modal/useUserStanctionModal';
import { IAdminMemberType } from '@/types/global';

import UserManagementButton from '../button/UserManagementButton';
import SkeletonUserCard from '../skeleton/SkeletonUserCard';

const SIZE = 1000;
const TYPE = 'member';

export default function UserManagement() {
  const [sorting, setSorting] = useState('DESC');

  const {
    isLoading,
    isError,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useAdmin(SIZE, sorting, TYPE);

  const { onOpen, setId } = useUserStanctionModal();

  const handleUserOnClick = (id: string) => {
    setId(id);
    onOpen();
  };

  return (
    <section className="w-full p-3">
      <div className="p-3 bg-blue10">
        <div className="grid grid-cols-3 gap-3 tablet:grid-cols-2 mobile:grid-cols-1">
          {isLoading
            ? [1, 2, 3, 4, 5, 6].map((item) => <SkeletonUserCard key={item} />)
            : data?.pages.map((page) => {
                return page.map((item: IAdminMemberType, index: number) => (
                  <div className="relative" key={`${item}-${index}`}>
                    <button
                      className="absolute right-0 top-0 p-1"
                      onClick={() => handleUserOnClick(item.id)}>
                      <IoEllipsisHorizontalSharp size={20} />
                    </button>
                    <UserManagementButton user={item} />
                  </div>
                ));
              })}
        </div>
      </div>
    </section>
  );
}
