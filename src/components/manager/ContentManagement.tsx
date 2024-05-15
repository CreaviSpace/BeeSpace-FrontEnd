import { IoEllipsisHorizontalSharp } from '@react-icons/all-files/io5/IoEllipsisHorizontalSharp';
import { useRouter } from 'next/router';
import { useState } from 'react';

import useAdminContentGet from '@/hooks/queries/admin/useAdminContentGet';
import useAdminContentsDelete from '@/hooks/queries/admin/useAdminContentsDelete';
import useReconfirmModal from '@/store/modal/useReconfirmModal';
import { IUniversalType } from '@/types/global';
import { parseValue } from '@/utils/parseValue';

import UniversalCard from '../card/UniversalCard';
import SkeletonUniversalCard from '../skeleton/SkeletonUniversalCard';

const SIZE = 1000;
const SORT_TYPE = 'ASC';
const status = true;

export default function ContentManagement() {
  const router = useRouter();
  const { type } = router.query;
  const [select, setSelect] = useState({ id: 0, type: '' });

  const { isLoading, data, isFetchingNextPage, hasNextPage } =
    useAdminContentGet(type as string, SIZE, status, SORT_TYPE);

  const { mutate } = useAdminContentsDelete(select.id, select.type);
  const { onOpen, setHandlerFunction, setTitle } = useReconfirmModal();
  const handleDeleteContent = (id: number, type: string) => {
    setSelect({ id, type });
    setTitle(`${parseValue(type.toUpperCase())}${id}을(를) 삭제하시겠습니까?`);
    setHandlerFunction(mutate);
    onOpen();
  };

  return (
    <section className="w-full p-3">
      {isLoading ? (
        <SkeletonUniversalCard size="large" />
      ) : (
        <div className="p-3 bg-blue10">
          {data?.pages?.map((item) => {
            return item?.map((item: IUniversalType, index: number) => (
              <div className="mx-auto relative" key={`${item}-${index}`}>
                <button
                  className="absolute z-[1] right-10 top-1 p-3"
                  onClick={() => handleDeleteContent(item.id, item.postType)}>
                  <IoEllipsisHorizontalSharp size={25} />
                </button>
                <UniversalCard
                  key={`${item}-${index}`}
                  id={item.id}
                  postType={item.postType}
                  title={item.title}
                  image={item.thumbnail ? item.thumbnail : ''}
                  content={
                    item.bannerContent ? item.bannerContent : item.content
                  }
                  hidden={false}
                  size="large"
                  className="border-2 border-gray20 mb-2 tablet:w-full bg-white"
                />
              </div>
            ));
          })}
        </div>
      )}
    </section>
  );
}
