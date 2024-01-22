import ProjectCard from '@/components/card/ProjectCard';
import { card, images } from '@/utils/data';

export default function ProjectCardStyle() {
  return (
    <div className="max-w-max_w">
      <h1 className="text-bs_24 font-bold mb-7">프로젝트</h1>
      <div className="grid grid-cols-3 gap-y-6 gap-x-3 bg-white tablet:grid-cols-2">
        {images.map((item, index) => (
          <ProjectCard
            key={`projectCard-${index}`}
            title={card.title}
            content={card.content}
            image={item}
          />
        ))}
      </div>
    </div>
  );
}
