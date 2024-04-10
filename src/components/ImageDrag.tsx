import { ReactNode } from 'react';
import { FileDrop } from 'react-file-drop';

interface IImageDropProps {
  children: ReactNode;
  handleImageUpload?: (imageFile: File) => void;
  handleImageDrag?: (image: string) => void;
  className?: string;
}

export default function ImageDrag({
  children,
  handleImageUpload,
  handleImageDrag,
  className,
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
      if (handleImageUpload) {
        handleImageUpload(files[0]);
      } else if (handleImageDrag) {
        const reader = new FileReader();
        reader.onload = () => {
          handleImageDrag(reader.result as string);
        };
        reader.readAsDataURL(files[0]);
      }
    }
  };

  return (
    <FileDrop
      onDrop={async (files: FileList | null) => {
        handleDragandDrop(files);
      }}
      className={className}>
      {children}
    </FileDrop>
  );
}
