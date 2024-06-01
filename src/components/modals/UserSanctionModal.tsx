import {
  Button,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
} from '@chakra-ui/react';
import { useState } from 'react';

import useMutateDeleteAdminSanction from '@/hooks/queries/admin/useMutateDeleteAdminSanction';
import useUserStanctionModal from '@/store/modal/useUserStanctionModal';

import Modals from './Modals';

export default function UserSanctionModal() {
  const { isOpen, onClose, id } = useUserStanctionModal();
  const [reasonValue, setReasonValue] = useState('');
  const data = {
    period: 1,
    memberId: id,
    reason: reasonValue,
  };

  const { mutate } = useMutateDeleteAdminSanction(data);

  const handleSanction = () => {
    mutate();
  };

  return (
    <Modals isOpen={isOpen} onClose={onClose}>
      <ModalHeader className="text-center">비활성화</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <section className="my-5">
          <p className="font-bold mb-2">비활성화 내용</p>
          <textarea
            name="value"
            id="value"
            rows={8}
            placeholder="비활성화 내용을 선택해주세요."
            value={reasonValue}
            onChange={(e) => setReasonValue(e.target.value)}
            className="w-full border border-gray10 bg-white rounded-bs_5 resize-none p-5"
          />
        </section>
      </ModalBody>
      <ModalFooter>
        <Button
          colorScheme="primary"
          color="black"
          onClick={handleSanction}
          className="w-full bg-primary text-bs_20 ">
          비활성화 하기
        </Button>
      </ModalFooter>
    </Modals>
  );
}
