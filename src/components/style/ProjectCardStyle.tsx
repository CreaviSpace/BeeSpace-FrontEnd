import ProjectCard from '@/components/card/ProjectCard';
import { card, images } from '@/utils/data';

export default function ProjectCardStyle() {
  return (
    <div className="max-w-max_w">
      <div className="grid grid-cols-4 gap-y-6 gap-x-3 tablet:grid-cols-2">
        {images.map((item) => (
          <ProjectCard
            key={`projectCard-${item}`}
            image={item}
            title={card.title}
            content={card.content}
            tagName="팀 프로젝트"
            tagCategory="field"
          />
        ))}
      </div>
    </div>
  );
}
