import { FaApple } from '@react-icons/all-files/fa/FaApple';
import { FaGlobe } from '@react-icons/all-files/fa/FaGlobe';
import { FaGooglePlay } from '@react-icons/all-files/fa/FaGooglePlay';
import { FaPlusCircle } from '@react-icons/all-files/fa/FaPlusCircle';
import { IoCloseOutline } from '@react-icons/all-files/io5/IoCloseOutline';

const ICONS = [
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

interface IDistributionLinkProps {
  className?: string;
  linkDtos: { linkType: string; url: string }[];
  setLinkDtos: (linkDtos: { linkType: string; url: string }[]) => void;
}

export default function DistributionLink({
  className,
  linkDtos,
  setLinkDtos,
}: IDistributionLinkProps) {
  const handleAddLink = () => {
    if (linkDtos.length < 5) {
      setLinkDtos([...linkDtos, { linkType: '', url: '' }]);
    }
  };

  const handleDeleteButton = (index: number) => {
    const newAddLink = linkDtos.filter((_, i) => i !== index);
    setLinkDtos(newAddLink);
  };

  const handleChangeLinkInput = (index: number, value: string) => {
    const newLink = [...linkDtos];
    newLink[index].url = value;
    setLinkDtos(newLink);
  };

  const handleChangeInput = (
    index: number,
    value: string,
    inputType: string
  ) => {
    const newAddLink = [...linkDtos];
    if (inputType === 'type') newAddLink[index].linkType = value;
    else if (inputType === 'url') newAddLink[index].url = value;
    setLinkDtos(newAddLink);
  };

  return (
    <div className={`${className}`}>
      <div className="flex justify-between">
        <h2 className="text-bs_20 mb-5 font-bold">
          배포주소 & 참고링크
          <span className="font-normal text-bs_18 ml-1">&#40;선택&#41;</span>
        </h2>
        <div className="">
          {linkDtos.length < 5 && (
            <button className="flex gap-1" onClick={handleAddLink}>
              <FaPlusCircle color={'#90CAF9'} size={25} />
              <span className="min_mobile:hidden">링크 추가</span>
            </button>
          )}
        </div>
      </div>
      <ul>
        {linkDtos.map((item, index) => {
          if (index < 3) {
            return (
              <li key={`${item}-${index}`} className="w-full flex mb-3">
                <div className="border border-gray30 rounded-full w-fit h-fit p-2">
                  {ICONS[index].icon}
                </div>
                <label htmlFor={ICONS[index].id} className="sr-only">
                  {ICONS[index].title}
                </label>
                <input
                  type="text"
                  name={ICONS[index].id}
                  id={ICONS[index].id}
                  value={item.url} // 임시 나중에 index로
                  placeholder={ICONS[index].placeholder}
                  onChange={(e) => {
                    handleChangeLinkInput(index, e.target.value);
                  }}
                  className="w-full h-[3.125rem] ml-2 border border-gray30 rounded-bs_5 pl-3 text-bs_14"
                />
              </li>
            );
          }
        })}
        {linkDtos.length > 3 &&
          linkDtos.map((item, index) => {
            if (index >= 3) {
              return (
                <li
                  key={`${item}-${index}`}
                  className="w-full flex justify-between mb-3 mobile:flex-col">
                  <label htmlFor="siteLink" className="sr-only">
                    참고 사이트 이름 입력란
                  </label>
                  <input
                    type="text"
                    name="siteLink"
                    id="siteLink"
                    placeholder="배포 또는 참고 사이트 이름"
                    value={item.linkType === 'default' ? '' : item.linkType}
                    onChange={(e) => {
                      handleChangeInput(index, e.target.value, 'type');
                    }}
                    className="w-1/3 h-[3.125rem] mr-2 border border-gray30 rounded-bs_5 pl-3 text-bs_14 mobile:w-full"
                  />
                  <div className="w-full flex mobile:mt-1">
                    <label htmlFor="siteLink" className="sr-only">
                      참고 사이트 입력란
                    </label>
                    <input
                      type="text"
                      name="siteLink"
                      id="siteLink"
                      placeholder="참고 사이트 링크를 입력해주세요."
                      value={item.url === 'default' ? '' : item.url}
                      onChange={(e) => {
                        handleChangeInput(index, e.target.value, 'url');
                      }}
                      className="w-full h-[3.125rem] mr-2 border border-gray30 rounded-bs_5 pl-3 text-bs_14"
                    />
                    <button onClick={() => handleDeleteButton(index)}>
                      <IoCloseOutline color="gray" size={30} />
                    </button>
                  </div>
                </li>
              );
            }
          })}
      </ul>
    </div>
  );
}
