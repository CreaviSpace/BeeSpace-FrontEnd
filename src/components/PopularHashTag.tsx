import Tag from '@/components/Tag';
export default function PopularHashTag() {
  return (
    <div className="w-[300px] h-fit">
      <h3 className="font-bold mb-3">인기 태그</h3>
      <div>
        <Tag name="tag" category="hashtag" />
        <Tag name="tag" category="hashtag" />
        <Tag name="tag" category="hashtag" />
        <Tag name="tag" category="hashtag" />
        <Tag name="tag" category="hashtag" />
        <Tag name="tag" category="hashtag" />
        <Tag name="tag" category="hashtag" />
        <Tag name="tag" category="hashtag" />
        <Tag name="tag" category="hashtag" />
        <Tag name="tag" category="hashtag" />
        <Tag name="tag" category="hashtag" />
      </div>
    </div>
  );
}
