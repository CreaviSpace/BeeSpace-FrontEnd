import { AiFillPlusCircle } from '@react-icons/all-files/ai/AiFillPlusCircle';
import { FaImage } from '@react-icons/all-files/fa/FaImage';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import CustomButton from '@/components/button/CustomButton';
import ImageDrag from '@/components/ImageDrag';
import { useMutateCreateImage } from '@/hooks/queries/useImage';
import useImageCompress from '@/hooks/useImageCompression';
import { dataURItoFile } from '@/utils/dataURItoFile';
import fileUpload from '@/utils/fileUpload';

import ImageCropper from './ImageCropper';

interface IProjectBanner {
  hidden?: boolean;
  thumbnail: string;
  setThumbnail: (thumbnail: string) => void;
  aspect?: number;
}

export default function ProjectBanner({
  hidden,
  thumbnail,
  setThumbnail,
  aspect,
}: IProjectBanner) {
  const [uploadImage, setUploadImage] = useState<string | null>(null); // 업로드 된 이미지
  const [imageName, setImageName] = useState<string>(''); // 이미지 이름
  const [compressedImage, setCompressedImage] = useState<string | null>(null); // 압축 이미지
  const [image, setImage] = useState<null | string>(null); // ImageCropper에서 보여주는 이미지

  const { isLoading: isCompressLoading, compressImage } = useImageCompress();

  const { mutate, data, isSuccess } = useMutateCreateImage();

  useEffect(() => {
    if (isSuccess && data) {
      setThumbnail(data?.data.data.url);
    }
  }, [isSuccess, data]);

  const handleCompressImage = async () => {
    if (!uploadImage) return;

    const imageFile = dataURItoFile(uploadImage, imageName);
    const compressedImage = await compressImage(imageFile);

    const formData = await fileUpload(compressedImage, setCompressedImage);

    mutate(formData);
  };

  const handleDeleteImage = () => {
    setCompressedImage(null);
    setThumbnail('');
  };

  const handleImageDrag = (image: string, imageName: string) => {
    setImage(image);
    setImageName(imageName);
  };

  useEffect(() => {
    if (uploadImage) {
      handleCompressImage();
    }
  }, [uploadImage]);

  return (
    <div
      className={`${hidden ? 'w-[9rem]' : 'w-[35rem] mobile:w-full'} relative`}>
      {hidden ? (
        <ImageDrag
          handleImageDrag={setImage}
          className="relative aspect-w-16 aspect-h-16">
          {compressedImage ? (
            <Image
              src={compressedImage}
              alt="프로필 사진"
              fill
              className="object-cover object-top rounded-full"
            />
          ) : thumbnail ? (
            <Image
              src={thumbnail}
              alt="프로필 사진"
              fill
              className="object-cover object-top rounded-full"
            />
          ) : (
            <div className="absolute w-full h-full bg-gray10 flex items-center justify-center text-white rounded-full ">
              {isCompressLoading ? (
                '이미지 압축 중..'
              ) : (
                <Image
                  src="/img/user/default.avif"
                  alt="userImage"
                  fill
                  className="rounded-full"
                />
              )}
            </div>
          )}
        </ImageDrag>
      ) : (
        <ImageDrag
          handleImageDrag={handleImageDrag}
          className="relative aspect-w-16 aspect-h-10">
          {compressedImage ? (
            <Image
              src={compressedImage}
              alt="프로젝트 배너 이미지"
              fill
              className="object-cover object-top rounded-bs_10"
            />
          ) : thumbnail ? (
            <Image
              src={thumbnail}
              alt="프로젝트 배너 이미지"
              fill
              className="object-cover object-top rounded-bs_10"
            />
          ) : (
            <div className="absolute w-full h-full bg-gray10 flex items-center justify-center text-white rounded-bs_10">
              {isCompressLoading ? '이미지 압축 중..' : <FaImage size={50} />}
            </div>
          )}
        </ImageDrag>
      )}

      <ImageCropper
        aspectRatio={aspect ? aspect : 16 / 10}
        onCrop={setUploadImage}
        image={image}
        setImage={setImage}
        setImageName={setImageName}>
        {hidden ? (
          <button
            className="absolute right-0 bottom-2"
            onClick={handleDeleteImage}>
            <AiFillPlusCircle size={40} />
          </button>
        ) : (
          <CustomButton
            onClick={handleDeleteImage}
            color="primary"
            className=" w-full h-[3.125rem] mt-3 text-black">
            이미지 추가
          </CustomButton>
        )}
      </ImageCropper>
      {!hidden && (
        <CustomButton
          onClick={handleDeleteImage}
          className="w-full h-[3.125rem] mt-2 text-black">
          이미지 제거
        </CustomButton>
      )}
    </div>
  );
}
