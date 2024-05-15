import {
  Button,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

import useReportPost from '@/hooks/queries/report/useReportPost';
import useReportModal from '@/store/modal/useReportModal';
import { parseEnum } from '@/utils/parseEnum';

import SelectButton from '../button/SelectButton';
import Modals from './Modals';

const OPTIONS = [
  '스팸',
  '음란물',
  '폭력',
  '혐오발언',
  '개인정보 유출',
  '부적절한 콘텐츠',
];

export default function ReportModal() {
  const { isOpen, onClose } = useReportModal();
  const router = useRouter();
  const { id } = router.query;
  const pathname = router.pathname.split('/')[1];

  const [select, setSelect] = useState(['신고 유형을 선택해주세요']);
  const [value, setValue] = useState('');

  const data = {
    postId: parseInt(id as string),
    postType:
      pathname.toUpperCase() === 'RECRUITMENT'
        ? 'RECRUIT'
        : pathname.toUpperCase(),
    category: parseEnum(select[0]),
    content: value,
  };

  const { mutate, isSuccess } = useReportPost(data);

  const { reportTitle } = useReportModal();

  const handleReport = () => {
    mutate();
    if (isSuccess) onClose();
  };

  return (
    <Modals isOpen={isOpen} onClose={onClose}>
      <ModalHeader className="text-center">신고하기</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <section className="my-5">
          <p className="font-bold mb-2">글 제목</p>
          <div className="text-bs_18">{reportTitle}</div>
        </section>

        <section className="my-5">
          <p className="font-bold mb-2">신고 유형</p>
          <SelectButton
            option={OPTIONS}
            select={select}
            setSelect={setSelect as (personnel: (string | number)[]) => void}
            index={0}
          />
        </section>

        <section className="my-5">
          <p className="font-bold mb-2">신고 내용</p>
          <textarea
            name="value"
            id="value"
            rows={8}
            placeholder="신고 내용을 선택해주세요."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full border border-gray10 bg-white rounded-bs_5 resize-none p-5"
          />
        </section>

        <section className="my-5">
          <div className="flex items-center text-xs mb-2">
            {/* <BsExclamationCircleFill color="#989898" size={20} /> */}
            <span>
              이 항목으로 신고하면 서로의 게시글이 보이지 않고, 서로 더 이상
              채팅을 보낼 수 없어요.
            </span>
          </div>

          <div className="flex items-center text-xs">
            {/* <BsExclamationCircleFill color="#989898" size={20} /> */}
            <span>
              신고 내용에 대한 사실 관계 확인이 필요할 경우, 운영자 측에서
              신고자에게 객관적 자료 제출을 요청할 수 있습니다.
            </span>
          </div>
        </section>
      </ModalBody>

      <ModalFooter>
        <Button
          colorScheme="primary"
          color="black"
          onClick={handleReport}
          className="w-full bg-primary text-bs_20 ">
          신고하기
        </Button>
      </ModalFooter>
    </Modals>
  );
}
