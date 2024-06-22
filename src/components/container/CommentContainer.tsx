import { UseMutateFunction } from '@tanstack/react-query';
import { useState } from 'react';

import CustomButton from '@/components/button/CustomButton';
import CommentCard from '@/components/card/CommentCard';
import useGetComment from '@/hooks/queries/comment/useGetComment';
import useMutateCreateComment from '@/hooks/queries/comment/useMutateCreateComment';
import useButtonDebounce from '@/hooks/useButtonDebounce';
import useCookie from '@/hooks/useCookie';

import SkeletonCommentCard from '../skeleton/SkeletonCommentCard';
import { ICommentContainerTypes } from './../../types/global.d';

interface ICommentContainerProps {
  id: number;
  type: string;
}

export default function CommentContainer({ id, type }: ICommentContainerProps) {
  const [value, setValue] = useState('');
  const { getCookies } = useCookie(['jwt']);
  const TOKEN = getCookies('jwt');

  const { isLoading, data } = useGetComment(id, type);
  const { mutate } = useMutateCreateComment(id, type);

  const handleDebounce = useButtonDebounce<UseMutateFunction>(300);

  const handleOnClickComment = () => {
    handleDebounce(() => {
      mutate(value);
      setValue('');
    });
  };

  return (
    <div>
      <h3 className="mb-5 text-bs_18">
        댓글 ({!isLoading ? data && data.length : 0})
      </h3>

      <div className="flex gap-5 min_mobile:flex-col">
        <input
          type="text"
          value={value}
          placeholder={TOKEN ? '댓글을 입력해주세요.' : '로그인을 해주세요.'}
          disabled={!TOKEN}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
          }}
          className="w-full border border-gray10 p-5 rounded-bs_5"
        />
        <CustomButton
          color="secondary"
          className={`min-w-[6.25rem] max-w-[6.25rem] py-2 mr-auto ${!TOKEN && 'opacity-75 hover:bg-blue20'}`}
          disabled={value.length <= 0 || !TOKEN}
          onClick={handleOnClickComment}>
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
