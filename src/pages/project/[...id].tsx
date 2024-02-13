import SideButton from '@/components/button/SideButton';
import CommentContainer from '@/components/container/CommentContainer';
import DetailsTitle from '@/components/details/DetailsTitle';
import DistributeLink from '@/components/details/project/DistributeLink';
import Members from '@/components/details/project/Members';
import SkillStack from '@/components/details/project/SkiilStack';
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
      <SideButton />
      <div className="py-8 border-b border-gray10">
        <div
          className="ql_editor"
          dangerouslySetInnerHTML={{ __html: details.content }}
        />
      </div>
      <div className="py-8 border-b border-black">
        <Tag name={'팀 프로젝트'} category={'team'} />
        <Members personnel={Personnel} />
        <DistributeLink link={Link} />
        <SkillStack skill={skill} />
      </div>
      <div className="text-right py-5">
        <Tag name={'설문조사 참여'} category={'team'} />
      </div>
      <CommentContainer />
    </div>
  );
}
