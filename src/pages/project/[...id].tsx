import { FaPaperclip } from '@react-icons/all-files/fa/FaPaperclip';

import SideButton from '@/components/button/SideButton';
import UserProfilButton from '@/components/button/UserProfilButton';
import CommentContainer from '@/components/container/CommentContainer';
import DetailsTitle from '@/components/DetailsTitle';
import Icons from '@/components/Icons';
import Tag from '@/components/Tag';
import { details } from '@/utils/data';

export default function ProjectDetail() {
  const Personnel = [
    { personnel: '디자인', people: [{ name: 'author' }, { name: 'author' }] },
    {
      personnel: '프론트엔드',
      people: [{ name: 'author' }, { name: 'author' }],
    },
    { personnel: '백엔드', people: [{ name: 'author' }, { name: 'author' }] },
    { personnel: 'PM', people: [{ name: 'author' }] },
  ];

  const Link = [
    { title: 'Android', link: '/google' },
    { title: 'Ios', link: '/apple' },
    { title: 'Web', link: '/web' },
  ];

  const skill = ['react', 'java'];

  return (
    <div className="relative max-w-max_w m-auto py-10 px-16">
      <DetailsTitle
        type="project"
        time={'2024.01.08'}
        views={0}
        likes={3}
        title="Some Title"
        userName="author"
      />
      <div className="absolute right-[2rem]">
        <SideButton />
      </div>
      <div className="py-8 border-b border-gray10">
        <div dangerouslySetInnerHTML={{ __html: details.content }} />
      </div>
      <div className="py-8 border-b border-black">
        <Tag name={'팀 프로젝트'} category={'team'} />
        <section className="pt-5">
          <h3 className="text-bs_20 font-bold">팀원 소개</h3>
          {Personnel.map((item, index) => (
            <ul
              key={`${item}-${index}`}
              className="flex items-center ml-8 p-5 border-l-2 border-gray10">
              <li className="min-w-20">{item.personnel}</li>
              {item.people.map((people, index) => (
                <li key={`${people}-${index}`} className="ml-5">
                  <UserProfilButton
                    userName={people.name}
                    className="border border-gray10 px-4 py-3"
                  />
                </li>
              ))}
            </ul>
          ))}
        </section>
        <section>
          <h3 className="text-bs_20 font-bold ml-4">링크</h3>
          <ul>
            {Link.map((item, index) => (
              <li
                key={`${item}-${index}`}
                className="flex items-center justify-between ml-8 p-5 border-l-2 border-gray10">
                <div className="flex items-center">
                  <Icons icon={item.title} />
                  <div className="ml-5">
                    <p className="text-bs_18 font-bold">{item.title}</p>
                    <div className="text-bs_16">{item.link}</div>
                  </div>
                </div>
                <span className="cursor-pointer">
                  <FaPaperclip size={20} />
                </span>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h3 className="text-bs_20 font-bold">기술 스택</h3>
          <ul className="flex gap-3 ml-8 p-5 border-l-2 border-gray10">
            {skill.map((item, index) => (
              <li
                key={`${item}-${index}`}
                className="w-10 h-10 border border-gray10 rounded-full"></li>
            ))}
          </ul>
        </section>
      </div>
      <div className="text-right py-5">
        <Tag name={'설문조사 참여'} category={'team'} />
      </div>
      <CommentContainer />
    </div>
  );
}
