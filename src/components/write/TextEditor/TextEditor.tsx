import 'react-quill/dist/quill.snow.css';

import { useEffect, useMemo, useRef } from 'react';
import ReactQuill from 'react-quill';

import ImageDrag from '@/components/ImageDrag';
import { useMutateCreateImage } from '@/hooks/queries/useImage';
import useImageCompression from '@/hooks/useImageCompression';
import fileUpload from '@/utils/fileUpload';

import CustomToolbar from './CustomToolbar';

const FORMATS = [
  'font',
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'align',
  'color',
  'background',
];

interface ITextEditor {
  values: string;
  setValues: (values: string) => void;
  setImages: (image: string) => void;
}

export default function TextEditor({
  values,
  setValues,
  setImages,
}: ITextEditor) {
  const { isLoading: isCompressLoading, compressImage } = useImageCompression();
  const inputRef = useRef<HTMLInputElement>(null);

  const { mutate, data, isSuccess } = useMutateCreateImage();

  useEffect(() => {
    if (isSuccess && data) {
      setImages(data?.data.data.url);

      const value = values + `<img src="${data?.data.data.url}" />`;
      setValues(value);
    }
  }, [isSuccess, data]);

  const handleImageUpload = async (imageFile: File) => {
    const compressedImage = await compressImage(imageFile);
    const formData = await fileUpload(compressedImage);
    mutate(formData);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;

    if (!files || files.length === 0) return;

    const reader = new FileReader();
    reader.onload = () => {
      handleImageUpload(files[0]);
    };
    reader.readAsDataURL(files[0]);
  };

  const handleImageClick = () => {
    if (inputRef.current) inputRef.current.click();
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: '#toolbar',
        handlers: {
          image: () => handleImageClick(),
        },
      },
    };
  }, []);

  return (
    <div>
      <h1 className="text-bs_20 font-bold my-5">소개</h1>
      <CustomToolbar />
      <ImageDrag handleImageUpload={handleImageUpload}>
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={FORMATS}
          value={values}
          onChange={setValues}
          className="h-[34.375rem]"
        />
      </ImageDrag>
      <input
        type="file"
        id="Imagefile"
        ref={inputRef}
        onChange={handleFileChange}
        className="sr-only"
      />
    </div>
  );
}
