import Tag from '@/components/Tag';
interface IPopularHashTagProps {
  tags: { hashTagId: number; hashTag: string }[];
}
export default function PopularHashTag({ tags }: IPopularHashTagProps) {
  return (
    <div className="w-[18.75rem] h-fit mt-6">
      <h3 className="font-bold mb-3">인기 태그</h3>
      <div>
        {tags &&
          tags.map((tag, index) => (
            <Tag key={index} name={tag.hashTag} category="hashtag" />
          ))}
      </div>
    </div>
  );
}
