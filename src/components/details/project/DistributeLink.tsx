import { FaPaperclip } from '@react-icons/all-files/fa/FaPaperclip';

import Icons from '@/components/Icons';

interface IDistributeLinkProps {
  links: { linkType: string; url: string }[];
}

export default function DistributeLink({ links }: IDistributeLinkProps) {
  return (
    <section>
      <h3 className="text-bs_20 font-bold ml-4">링크</h3>
      <ul>
        {links.map((item, index) => (
          <li
            key={`${item}-${index}`}
            className="flex items-center justify-between ml-8 p-5 border-l-2 border-gray10">
            <div className="flex items-center">
              <Icons icon={item.linkType} />
              <div className="ml-5">
                <p className="text-bs_18 font-bold">{item.linkType}</p>
                <div className="text-bs_16">{item.url}</div>
              </div>
            </div>
            <span className="cursor-pointer">
              <FaPaperclip size={20} />
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
