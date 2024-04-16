import { useState } from 'react';

import useAdmin from '@/hooks/useAdmin';
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

  return (
    <section className="w-full p-3">
      <div className="p-3 bg-blue10">
        <div className="grid grid-cols-3 gap-3 tablet:grid-cols-2 mobile:grid-cols-1">
          {isLoading
            ? [1, 2, 3, 4, 5, 6].map((item) => <SkeletonUserCard key={item} />)
            : data?.pages.map((page) => {
                return page.map((item: IAdminMemberType, index: number) => (
                  <UserManagementButton key={`${item}-${index}`} user={item} />
                ));
              })}
        </div>
      </div>
    </section>
  );
}
