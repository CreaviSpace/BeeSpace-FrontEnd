import { useState } from 'react';

import CustomButton from '@/components/button/CustomButton';
import CommentCard from '@/components/card/CommentCard';
import useCommentGetPost from '@/hooks/comment/useCommentGetPost';

import SkeletonCommentCard from '../skeleton/SkeletonCommentCard';
import { ICommentContainerTypes } from './../../types/global.d';

interface ICommentContainerProps {
  id: number;
  type: string;
}

export default function CommentContainer({ id, type }: ICommentContainerProps) {
  const [value, setValue] = useState('');

  const {
    isLoading,
    isError,
    data,
    isFetching,
    mutate: mutatePost,
  } = useCommentGetPost(id, type, value);

  return (
    <div>
      <h3 className="mb-5 text-bs_18">
        댓글 ({!isLoading ? data && data.length : 0})
      </h3>
      <div className="flex gap-5 min_mobile:flex-col">
        <input
          type="text"
          value={value}
          placeholder="댓글을 입력해주세요."
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
          }}
          className="w-full border border-gray10 p-5 rounded-bs_5"
        />
        <CustomButton
          color="secondary"
          className="min-w-[6.25rem] max-w-[6.25rem] py-2 mr-auto"
          onClick={() => mutatePost()}>
          등록
        </CustomButton>
      </div>

      <div className="mt-10">
        {isLoading ? (
          <SkeletonCommentCard />
        ) : (
          data?.length > 0 &&
          data.map((item: ICommentContainerTypes, index: number) => (
            <CommentCard
              key={`${item}-${index}`}
              postid={id}
              item={item}
              type={type}
            />
          ))
        )}
      </div>
    </div>
  );
}
