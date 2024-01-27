import ProjectCard from '@/components/card/ProjectCard';
import { card, images } from '@/utils/data';

export default function ProjectCardContainer() {
  return (
    <div className="max-w-max_w">
      <div className="grid grid-cols-4 gap-y-6 gap-x-3 tablet:grid-cols-2 mobile:grid-cols-1">
        {images.map((item) => (
          <ProjectCard
            key={`projectCard-${item}`}
            image={item}
            id={card.id}
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
