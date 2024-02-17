import ProjectCard from '@/components/card/ProjectCard';
import { card, images } from '@/utils/data';

export default function ProjectCardContainer() {
  return (
    <div className="max-w-max_w w-full">
      <div className="grid grid-cols-4 gap-y-6 gap-x-3 tablet:grid-cols-2 mobile:grid-cols-1">
        {images.map((item, index) => (
          <ProjectCard
            key={`projectCard-${index}`}
            image={item}
            id="123"
            type="project"
            title={card.title}
            content={card.content}
            tagName="팀 프로젝트"
            tagCategory="team"
          />
        ))}
      </div>
    </div>
  );
}
