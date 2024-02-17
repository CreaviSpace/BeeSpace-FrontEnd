import { FaImage } from '@react-icons/all-files/fa/FaImage';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import CustomButton from '@/components/button/CustomButton';
import useImageCompress from '@/hooks/useImageCompression';
import { dataURItoFile } from '@/utils/dataURItoFile';

import ImageCropper from './ImageCropper';

export default function ProjectBanner() {
  const [uploadImage, setUploadImage] = useState<string | null>(null);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const { isLoading: isCompressLoading, compressImage } = useImageCompress();

  const handleUploadImage = (image: string) => setUploadImage(image);

  const handleCompressImage = async () => {
    if (!uploadImage) return;

    const imageFile = dataURItoFile(uploadImage);

    const compressedImage = await compressImage(imageFile);

    // 이미지 서버 저장 로직
    if (!compressedImage) return;
    const imageUrl = URL.createObjectURL(compressedImage);
    setCompressedImage(imageUrl);
  };

  const handleDeleteImage = () => {
    setCompressedImage(null);
    // const fileInput = useRef(null)
    // if (fileInput) {
    //   fileInput.value = '';
  };

  useEffect(() => {
    if (uploadImage) {
      handleCompressImage();
    }
  }, [uploadImage]);

  return (
    <div>
      <div className="relative w-[300px] h-[300px]">
        {compressedImage ? (
          <Image
            src={compressedImage}
            alt=""
            width={300}
            height={300}
            className="w-full h-full rounded-bs_10"
          />
        ) : (
          <div className=" absolute w-[300px] h-[300px] bg-gray10 flex items-center justify-center text-white rounded-bs_10">
            {isCompressLoading ? '이미지 압축 중..' : <FaImage size={50} />}
          </div>
        )}
        <ImageCropper aspectRatio={1 / 1} onCrop={handleUploadImage}>
          <CustomButton
            onClick={handleDeleteImage}
            color="primary"
            className="absolute w-[300px] h-[50px] mt-3 left-0 bottom-[-60px]">
            이미지 추가
          </CustomButton>
        </ImageCropper>
      </div>
      <CustomButton
        onClick={handleDeleteImage}
        className="w-[300px] h-[50px] mt-[70px]">
        이미지 제거
      </CustomButton>
    </div>
  );
}
