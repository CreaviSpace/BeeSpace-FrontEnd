import { FaPaperclip } from '@react-icons/all-files/fa/FaPaperclip';
import Link from 'next/link';
import { toast } from 'react-toastify';

import Icons from '@/components/Icons';

interface IDistributeLinkProps {
  links: { linkType: string; url: string }[];
}

export default function DistributeLink({ links }: IDistributeLinkProps) {
  const handleCopyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('클립보드에 성공했어요', { autoClose: 1000 });
    } catch (err) {
      console.error('Failed to copy text to clipboard:', err);
    }
  };

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
                <Link href={item.url} className="text-bs_16" target="_blank">
                  {item.url}
                </Link>
              </div>
            </div>
            <span
              className="cursor-pointer"
              onClick={() => handleCopyToClipboard(item.url)}>
              <FaPaperclip size={20} />
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
