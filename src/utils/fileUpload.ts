import axios from 'axios';

import { getCookies } from '@/utils/cookie/getCookies';

import { postCookies } from './cookie/postCookies';

const fileUpload = async (
  compressedImage: Blob | undefined,
  setCompressedImage?: (compressedImage: string | null) => void
) => {
  // 이미지 서버 저장 로직
  if (!compressedImage) return;

  const imageUrl = URL.createObjectURL(compressedImage);
  if (setCompressedImage) setCompressedImage(imageUrl);

  const formData = new FormData();
  formData.append('file', compressedImage);

  const response = await axios.post(
    `${process.env.BASE_URL}/file/upload`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: getCookies('jwt'),
      },
    }
  );

  if (response.status === 200 && response.data.success) {
    return response.data.data.url;
  } else if (response.status === 202 && !response.data.success) {
    postCookies({
      jwt: response.data.jwt,
      memberId: response.data.memberId,
    });
  }
};

export default fileUpload;
