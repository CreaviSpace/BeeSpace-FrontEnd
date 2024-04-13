import { FaImage } from '@react-icons/all-files/fa/FaImage';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import CustomButton from '@/components/button/CustomButton';
import ImageDrag from '@/components/ImageDrag';
import useImageCompress from '@/hooks/useImageCompression';
import { dataURItoFile } from '@/utils/dataURItoFile';
import fileUpload from '@/utils/fileUpload';

import ImageCropper from './ImageCropper';

interface IProjectBanner {
  thumbnail: string;
  setThumbnail: (thumbnail: string) => void;
}

export default function ProjectBanner({
  thumbnail,
  setThumbnail,
}: IProjectBanner) {
  const [uploadImage, setUploadImage] = useState<string | null>(null); // 업로드 된 이미지
  const [imageName, setImageName] = useState<string>(''); // 이미지 이름
  const [compressedImage, setCompressedImage] = useState<string | null>(null); // 압축 이미지
  const [image, setImage] = useState<null | string>(null); // ImageCropper에서 보여주는 이미지

  const { isLoading: isCompressLoading, compressImage } = useImageCompress();

  const handleCompressImage = async () => {
    if (!uploadImage) return;

    const imageFile = dataURItoFile(uploadImage, imageName);
    const compressedImage = await compressImage(imageFile);

    const imageURL = await fileUpload(compressedImage, setCompressedImage);
    setThumbnail(imageURL);
  };

  const handleDeleteImage = () => {
    setCompressedImage(null);
    setThumbnail('');
  };

  useEffect(() => {
    if (uploadImage) {
      handleCompressImage();
    }
  }, [uploadImage]);

  return (
    // h-[21.875rem]
    <div className="relative w-[35rem] mobile:w-full">
      <ImageDrag
        handleImageDrag={setImage}
        className="relative aspect-w-16 aspect-h-10">
        {compressedImage ? (
          <Image
            src={compressedImage}
            alt="bannerImage"
            fill
            className="object-cover object-top rounded-bs_10"
          />
        ) : thumbnail ? (
          <Image
            src={thumbnail}
            alt="bannerImage"
            fill
            className="object-cover object-top rounded-bs_10"
          />
        ) : (
          <div className="absolute w-full h-full bg-gray10 flex items-center justify-center text-white rounded-bs_10">
            {isCompressLoading ? '이미지 압축 중..' : <FaImage size={50} />}
          </div>
        )}
      </ImageDrag>

      <ImageCropper
        aspectRatio={16 / 10}
        onCrop={setUploadImage}
        image={image}
        setImage={setImage}
        setImageName={setImageName}>
        <CustomButton
          onClick={handleDeleteImage}
          color="primary"
          className=" w-full h-[3.125rem] mt-3">
          이미지 추가
        </CustomButton>
      </ImageCropper>

      <CustomButton
        onClick={handleDeleteImage}
        className="w-full h-[3.125rem] mt-2">
        이미지 제거
      </CustomButton>
    </div>
  );
}
