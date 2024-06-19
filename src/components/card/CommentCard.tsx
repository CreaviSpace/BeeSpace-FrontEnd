import moment from 'moment';
import { useState } from 'react';

import UserProfileButton from '@/components/button/UserProfileButton';
import useMutateDeleteComment from '@/hooks/queries/comment/useMutateDeleteComment';
import useMutateUpdateComment from '@/hooks/queries/comment/useMutateUpdateComment';
import useReconfirmModal from '@/store/modal/useReconfirmModal';
import { ICommentContainerTypes } from '@/types/global';

import CustomButton from './../button/CustomButton';

interface ICommentCardType {
  postid: number;
  item: ICommentContainerTypes;
  type: string;
}
export default function CommentCard({ item, type, postid }: ICommentCardType) {
  const [click, setClick] = useState(false);
  const [value, setValue] = useState(item.content);
  const [selectedComment, setSelectedComment] = useState({
    id: 0,
    type: '',
    postid: 0,
  });
  const { mutate: mutatePut, isSuccess } = useMutateUpdateComment(
    selectedComment.id,
    selectedComment.type,
    selectedComment.postid,
    value
  );

  const { mutate: mutateDelete } = useMutateDeleteComment(
    selectedComment.id,
    selectedComment.type,
    selectedComment.postid
  );

  const handlePutComment = () => {
    setClick(!click);
  };

  const { onOpen, setHandlerFunction, setTitle } = useReconfirmModal();
  const handleDeleteComment = (id: number, type: string, postid: number) => {
    setSelectedComment({ id, type, postid });
    setTitle('이 댓글을 삭제하시겠습니까?');
    setHandlerFunction(mutateDelete);
    onOpen();
  };
  const time = item.modifiedDate;
  const receivedDate = moment(time);
  const today = moment();
  const isToday = receivedDate.isSame(today, 'day');
  const formattedDate = isToday
    ? receivedDate.format('HH:mm:ss')
    : receivedDate.format('YYYY-MM-DD');

  return (
    <div className="py-5 border-b border-gray10">
      <div className="flex justify-between items-center">
        <UserProfileButton
          userName={item.memberNickName}
          imageURL={item.memberProfileUrl}
          memberId={item.memberId}
        />
        <div className={click === true ? 'sr-only' : ''}>
          <button onClick={handlePutComment}>수정</button>&nbsp;&#124;&nbsp;
          <button onClick={() => handleDeleteComment(item.id, type, postid)}>
            삭제
          </button>
        </div>
      </div>
      {click ? (
        <div className="flex justify-between">
          <input
            className="mt-3 text-bs_18 border w-full p-2 rounded-bs_5"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <CustomButton
            className="p-3 mt-3 ml-3 w-[6rem]"
            color="secondary"
            onClick={() => {
              mutatePut();
              if (isSuccess) handlePutComment();
            }}>
            수정
          </CustomButton>
          <CustomButton
            className="p-3 mt-3 ml-1 w-[6rem]"
            onClick={handlePutComment}>
            취소
          </CustomButton>
        </div>
      ) : (
        <div className="mt-2">
          <span className="text-bs_14 text-gray30">{formattedDate}</span>
          <div className="mt-1 text-bs_18">{item.content}</div>
        </div>
      )}
    </div>
  );
}
