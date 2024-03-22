import 'react-quill/dist/quill.snow.css';

import { useMemo } from 'react';
import ReactQuill from 'react-quill';

import ImageDrag from '@/components/ImageDrag';

import CustomToolbar from './CustomToolbar';

const formats = [
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
  const modules = useMemo(() => {
    return {
      toolbar: {
        container: '#toolbar',
        // [
        //   [{ header: [1, 2, false] }],
        //   ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        //   [
        //     { list: 'ordered' },
        //     { list: 'bullet' },
        //     { indent: '-1' },
        //     { indent: '+1' },
        //   ],
        //   ['link', 'image'],
        //   [{ align: [] }, { color: [] }, { background: [] }],
        //   ['clean'],
        // ],
      },
    };
  }, []);

  return (
    <div>
      <h1 className="text-bs_20 font-bold my-5">소개</h1>
      <CustomToolbar />
      <ImageDrag>
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          value={values}
          onChange={setValues}
          className="h-[34.375rem]"
        />
      </ImageDrag>
    </div>
  );
}
