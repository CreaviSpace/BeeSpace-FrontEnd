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

  return formData;
};

export default fileUpload;
