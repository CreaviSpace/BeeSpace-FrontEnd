import { ReactNode } from 'react';
import { FileDrop } from 'react-file-drop';

interface IImageDropProps {
  children: ReactNode;
  image?: string;
  setImage?: (image: string) => void;
  setFile?: (file: File | undefined) => void;
}

export default function ImageDrag({
  children,
  image,
  setImage,
  setFile,
}: IImageDropProps) {
  const handleDragandDrop = (files: FileList | null) => {
    if (!files) {
      return;
    }
    const filename = encodeURIComponent(files[0].name);
    if (files[0].size >= 5000000) {
      alert('5MB 이상 파일은 업로드가 불가능합니다.');
    } else if (
      files[0].type == 'image/png' ||
      files[0].type == 'image/jpeg' ||
      files[0].type == 'image/jpg' ||
      files[0].type == 'image/webp' ||
      files[0].type == 'image/avif'
    ) {
      //   console.log(filename);
    }
  };

  return (
    <FileDrop
      onDrop={async (files: FileList | null) => {
        handleDragandDrop(files);
      }}>
      {children}
    </FileDrop>
  );
}
