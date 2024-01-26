import { useState } from 'react';

import CustomButton from '../button/CustomButton';
import UserProfilButton from '../button/UserProfilButton';

export default function CommentContainer() {
  const [value, setValue] = useState('');
  const comment = [
    'This is image included post. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do This is image included post. ',
  ];

  return (
    <div>
      <h3 className="mb-5 text-bs_20">댓글 ({comment.length})</h3>
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

      <div className="mt-10">
        {comment.map((item, index) => (
          <div key={`${item}-${index}`} className="py-5 border-b border-gray10">
            <div className="flex justify-between items-center">
              <UserProfilButton userName="author" />
              <div>
                <button>수정</button>&nbsp;&#124;&nbsp;<button>버튼</button>
              </div>
            </div>
            <div className="mt-3 text-bs_18">{item}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
