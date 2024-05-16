import 'react-quill/dist/quill.snow.css';

import { useMemo, useRef } from 'react';
import ReactQuill from 'react-quill';

import ImageDrag from '@/components/ImageDrag';
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
}

export default function TextEditor({ values, setValues }: ITextEditor) {
  const { isLoading: isCompressLoading, compressImage } = useImageCompression();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (imageFile: File) => {
    const compressedImage = await compressImage(imageFile);
    const imageURL = await fileUpload(compressedImage);
    const value = values + `<img src="${imageURL}" />`;
    setValues(value);
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
