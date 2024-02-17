import 'cropperjs/dist/cropper.css';

import { useRef, useState } from 'react';
import Cropper, { ReactCropperElement } from 'react-cropper';

interface PropsType {
  onCrop: (image: string) => void;
  aspectRatio: number;
  children: React.ReactNode;
}

const ImageCropper = ({ children, aspectRatio, onCrop }: PropsType) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const cropperRef = useRef<ReactCropperElement>(null);
  const [image, setImage] = useState<null | string>(null);

  const handleChildrenClick = () => {
    if (inputRef.current) inputRef.current.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const files = e.target.files;

    if (!files || files.length === 0) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== 'undefined') {
      onCrop(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      setImage(null);
    }
  };

  return (
    <>
      <input
        type="file"
        id="Imagefile"
        ref={inputRef}
        onChange={handleFileChange}
        className="sr-only"
      />
      <label htmlFor="Imagefile" onClick={handleChildrenClick}>
        {children}
      </label>
      {image && (
        <div className="fixed left-0 top-0 w-screen h-screen flex justify-center items-center z-10">
          <div className="fixed w-full h-full bg-[#000000e0]" />
          <div className="z-[2] bg-white overflow-y-auto overflow-x-hidden flex flex-col max-h-[80%]">
            <h2 className="font-semibold text-bs_22 leading-7 px-4 py-5">
              이미지 편집하기
            </h2>
            <div className="flex-1 flex items-center justify-center bg-white">
              <div className="flex-1 flex items-center justify-center bg-white">
                <Cropper
                  ref={cropperRef}
                  aspectRatio={aspectRatio}
                  src={image}
                  viewMode={1}
                  width={800}
                  height={500}
                  background={false}
                  responsive
                  autoCropArea={1}
                  checkOrientation={false}
                  guides
                />
              </div>
            </div>
            <div className="flex justify-end items-center py-5 px-4 bg-white gap-x-3">
              <button
                onClick={() => setImage(null)}
                className="w-[6.25rem] h-10 rounded border border-gray20">
                취소
              </button>
              <button
                className="w-[6.25rem] h-10 rounded bg-gray20 text-white"
                onClick={getCropData}>
                적용하기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageCropper;
