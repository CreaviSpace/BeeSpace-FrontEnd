import {
  Button,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
} from '@chakra-ui/react';
import { useState } from 'react';

import useReportModal from '@/hooks/useReportModal';

import CustomSelect from '../button/CustomSelect';
import Modals from './Modals';

export default function ReportModal() {
  const { isOpen, onOpen, onClose } = useReportModal();

  const [option] = useState(['욕설', '사기', '신고']);
  const [select, setSelect] = useState(['신고 유형을 선택해주세요']);

  return (
    <Modals isOpen={isOpen} onClose={onClose}>
      <ModalHeader className="text-center">신고하기</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <section className="my-5">
          <p className="font-bold mb-2">글 제목</p>
          <div className="text-bs_18">This is image included post. </div>
        </section>

        <section className="my-5">
          <p className="font-bold mb-2">신고 유형</p>
          <CustomSelect
            option={option}
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
            className="w-full border border-gray40 bg-gray10 rounded-bs_5 resize-none p-5"
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
          onClick={onClose}
          className="w-full bg-primary text-bs_20 ">
          신고하기
        </Button>
      </ModalFooter>
    </Modals>
  );
}
