import UniversalCard from '@/components/card/UniversalCard';
import Category from '@/components/Category';
import { card } from '@/utils/data';

export default function Search() {
  const categories = [
    {
      name: '프로젝트',
      link: 'project&value=val',
    },
    {
      name: '모집',
      link: 'recruitment&value=val',
    },
    {
      name: '커뮤니티',
      link: 'community&value=val',
    },
  ];

  const side = [
    { name: '개인 프로젝트', link: '#' },
    { name: '팀 프로젝트', link: '#' },
    { name: '스터디', link: '#' },
    { name: '프로젝트 모집', link: '#' },
    { name: 'Q&A', link: '#' },
    { name: '피드백', link: '#' },
    { name: '고민', link: '#' },
    { name: '수다', link: '#' },
  ];

  const size = [1, 2, 3, 4, 5];

  return (
    <main>
      <Category category={categories} />
      <div className="grid grid-cols-5 max-w-max_w m-auto py-10 tablet:grid-cols-4 mobile:grid-cols-4">
        <aside className="col-span-1 tablet:hidden mobile:hidden">
          <div className="h-[2.25rem] my-7"></div>
          <ul className="border border-gray10 py-8 pl-5 pr-20 w-fit rounded-bs_10 fixed">
            {side.map((item, index) => (
              <li key={`${item}-${index}`} className="py-1 text-bs_18">
                {item.name}
              </li>
            ))}
          </ul>
        </aside>
        <section className="col-span-4 mx-auto">
          <h2 className="text-bs_34 font-bold my-5">전체 {size.length}</h2>
          {size.map((item, index) => (
            <UniversalCard
              key={`${item}-${index}`}
              id={card.id}
              title={card.title}
              content={card.content}
              date={card.date}
              size="large"
              className="my-5"
            />
          ))}
        </section>
      </div>
    </main>
  );
}
