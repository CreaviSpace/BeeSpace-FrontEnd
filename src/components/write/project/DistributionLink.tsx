import { FaApple } from '@react-icons/all-files/fa/FaApple';
import { FaGlobe } from '@react-icons/all-files/fa/FaGlobe';
import { FaGooglePlay } from '@react-icons/all-files/fa/FaGooglePlay';
import { FaPlusCircle } from '@react-icons/all-files/fa/FaPlusCircle';
import { IoCloseOutline } from '@react-icons/all-files/io5/IoCloseOutline';
import { useState } from 'react';

export default function DistributionLink() {
  const [addLink, setAddLink] = useState<string[]>([]);
  const [LinkNum, setLinkNum] = useState<[string, number][]>([['default', 0]]);

  const handleAddLink = () => {
    if (addLink.length < 5) {
      setAddLink([...addLink, 'default']);
      setLinkNum([...LinkNum, ['default', 0]]);
    }
  };

  const icons = [
    {
      id: 'webSite',
      title: '웹 사이트',
      icon: <FaGlobe size={25} />,
      placeholder: '웹 사이트 배포 링크를 입력해주세요.',
    },
    {
      id: 'googleStore',
      title: '구글 스토어',
      icon: <FaGooglePlay size={25} />,
      placeholder: '구글 스토어 배포 링크를 입력해주세요.',
    },
    {
      id: 'appleStore',
      title: '애플 스토어',
      icon: <FaApple size={25} />,
      placeholder: '애플 스토어 배포 링크를 입력해주세요.',
    },
  ];

  const handleDeleteButton = (index: number) => {
    setAddLink(addLink.filter((_, i) => i !== index));
  };

  return (
    <div className="flow-root">
      <h2 className="text-bs_20 mb-5 font-bold float-start">
        배포주소 & 참고링크
        <span className="font-normal text-bs_18 ml-1">&#40;선택&#41;</span>
      </h2>
      <div className="float-end">
        {addLink.length < 5 && (
          <button className="flex gap-1" onClick={handleAddLink}>
            <FaPlusCircle color={'#90CAF9'} size={25} />
            링크 추가
          </button>
        )}
      </div>
      <ul>
        {icons.map((item, index) => (
          <li key={`${item}-${index}`} className="w-full flex mb-3">
            <div className="border border-gray30 rounded-full w-fit h-fit p-2">
              {item.icon}
            </div>
            <label htmlFor={item.id} className="sr-only">
              {item.title}
            </label>
            <input
              type="text"
              name={item.id}
              id={item.id}
              placeholder={item.placeholder}
              className="w-full h-[3.125rem] ml-2 border border-gray30 rounded-bs_5 pl-3 text-bs_14"
            />
          </li>
        ))}
        {addLink.length > 0 &&
          addLink.map((item, index) => (
            <li
              key={`${item}-${index}`}
              className="w-full flex justify-between mb-3">
              <label
                htmlFor="siteLink"
                className="font-bold text-nowrap text-center p-3 h-[3.125rem]">
                {`사이트 이름`}
              </label>
              <input
                type="text"
                name="siteLink"
                id="siteLink"
                placeholder="링크를 입력해주세요."
                className="w-full h-[3.125rem] mr-2 border border-gray30 rounded-bs_5 pl-3 text-bs_14"
              />
              <button onClick={() => handleDeleteButton(index)}>
                <IoCloseOutline color="gray" size={30} />
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}
