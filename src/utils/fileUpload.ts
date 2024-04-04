import axios from 'axios';

import { getCookies } from '@/utils/getCookies';

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

  if (response.data.success) {
    return response.data.data.url;
  }
};

export default fileUpload;
