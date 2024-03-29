import { FaApple } from '@react-icons/all-files/fa/FaApple';
import { FaGlobe } from '@react-icons/all-files/fa/FaGlobe';
import { FaGooglePlay } from '@react-icons/all-files/fa/FaGooglePlay';
import { FaPlusCircle } from '@react-icons/all-files/fa/FaPlusCircle';
import { IoCloseOutline } from '@react-icons/all-files/io5/IoCloseOutline';
import { useEffect, useState } from 'react';

interface IDistributionLinkProps {
  className?: string;
  setLinkDtos: (linkDtos: { type: string; url: string }[]) => void;
}

export default function DistributionLink({
  className,
  setLinkDtos,
}: IDistributionLinkProps) {
  const [addLink, setAddLink] = useState<{ type: string; url: string }[]>([]);
  const [link, setLink] = useState<{ type: string; url: string }[]>([]);

  useEffect(() => {
    const newLinkDtos = [...addLink, ...link];
    setLinkDtos(newLinkDtos);
  }, [addLink, link]);

  const handleAddLink = () => {
    if (addLink.length < 5) {
      setAddLink([...addLink, { type: 'default', url: 'default' }]);
    }
  };

  const icons = [
    {
      id: 'web',
      title: '웹 사이트',
      icon: <FaGlobe size={25} />,
      placeholder: '웹 사이트 배포 링크를 입력해주세요.',
    },
    {
      id: 'android',
      title: '구글 스토어',
      icon: <FaGooglePlay size={25} />,
      placeholder: '구글 스토어 배포 링크를 입력해주세요.',
    },
    {
      id: 'apple',
      title: '앱 스토어',
      icon: <FaApple size={25} />,
      placeholder: '애플 스토어 배포 링크를 입력해주세요.',
    },
  ];

  const handleDeleteButton = (index: number) => {
    const newAddLink = addLink.filter((_, i) => i !== index);
    setAddLink(newAddLink);
  };

  const handleChangeLinkInput = (type: string, value: string) => {
    const newLink = [...link];
    if (newLink.some((item) => item.type === type)) {
      const index = newLink.findIndex((item) => item.type === type);
      newLink[index].url = value;
      setLink(newLink);
    } else {
      const newLink = [...link, { type: type, url: value }];
      setLink(newLink);
    }
  };

  const handleChangeInput = (
    index: number,
    value: string,
    inputType: string
  ) => {
    const newAddLink = [...addLink];
    if (inputType === 'type') newAddLink[index].type = value;
    else if (inputType === 'url') newAddLink[index].url = value;
    setAddLink(newAddLink);
  };

  return (
    <div className={`${className}`}>
      <div className="flex justify-between">
        <h2 className="text-bs_20 mb-5 font-bold">
          배포주소 & 참고링크
          <span className="font-normal text-bs_18 ml-1">&#40;선택&#41;</span>
        </h2>
        <div className="">
          {addLink.length < 5 && (
            <button className="flex gap-1" onClick={handleAddLink}>
              <FaPlusCircle color={'#90CAF9'} size={25} />
              <span className="min_mobile:hidden">링크 추가</span>
            </button>
          )}
        </div>
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
              onChange={(e) => {
                handleChangeLinkInput(item.id, e.target.value);
              }}
              className="w-full h-[3.125rem] ml-2 border border-gray30 rounded-bs_5 pl-3 text-bs_14"
            />
          </li>
        ))}
        {addLink.length > 0 &&
          addLink.map((item, index) => (
            <li
              key={`${item}-${index}`}
              className="w-full flex justify-between mb-3">
              <label htmlFor="siteLink" className="sr-only">
                참고 사이트 이름 입력란
              </label>
              <input
                type="text"
                name="siteLink"
                id="siteLink"
                placeholder="배포 또는 참고 사이트 이름"
                value={
                  addLink[index].type === 'default' ? '' : addLink[index].type
                }
                onChange={(e) => {
                  handleChangeInput(index, e.target.value, 'type');
                }}
                className="w-1/3 h-[3.125rem] mr-2 border border-gray30 rounded-bs_5 pl-3 text-bs_14"
              />
              <label htmlFor="siteLink" className="sr-only">
                참고 사이트 입력란
              </label>
              <input
                type="text"
                name="siteLink"
                id="siteLink"
                placeholder="참고 사이트 링크를 입력해주세요."
                value={
                  addLink[index].url === 'default' ? '' : addLink[index].url
                }
                onChange={(e) => {
                  handleChangeInput(index, e.target.value, 'url');
                }}
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
