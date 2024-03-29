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
    <div className="relative w-[35rem] h-[21.875rem] mobile:w-full">
      <div className="aspect-w-16 aspect-h-10">
        {compressedImage ? (
          <Image
            src={compressedImage}
            alt="bannerImage"
            fill
            className="object-cover object-top rounded-bs_10"
          />
        ) : (
          <div className="absolute w-full h-full bg-gray10 flex items-center justify-center text-white rounded-bs_10">
            {isCompressLoading ? '이미지 압축 중..' : <FaImage size={50} />}
          </div>
        )}
        <ImageCropper aspectRatio={16 / 10} onCrop={handleUploadImage}>
          <div className="w-full absolute -bottom-[7.5rem]">
            <CustomButton
              onClick={handleDeleteImage}
              color="primary"
              className=" w-full h-[3.125rem] mt-3">
              이미지 추가
            </CustomButton>
            <CustomButton
              onClick={handleDeleteImage}
              className="w-full h-[3.125rem] mt-2">
              이미지 제거
            </CustomButton>
          </div>
        </ImageCropper>
      </div>
    </div>
  );
}
