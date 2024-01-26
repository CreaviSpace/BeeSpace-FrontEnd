import { useState } from 'react';

import { details } from '@/utils/data';

import CustomButton from '../button/CustomButton';

export default function CommentContainer() {
  const [value, setValue] = useState('');
  const comment = [
    'This is image included post. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do This is image included post. ',
  ];

  return (
    <div>
      <h2>댓글 ({comment.length})</h2>
      <div className="flex gap-5">
        <input
          type="text"
          value={value}
          placeholder="댓글을 입력해주세요."
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
          }}
          className="w-full border border-gray10 p-5"
        />
        <CustomButton color="secondary" className="w-[6.25rem]">
          등록
        </CustomButton>
      </div>
      <div dangerouslySetInnerHTML={{ __html: details.content }} />
    </div>
  );
}
