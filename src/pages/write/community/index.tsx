import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import OnoffButton from '@/components/button/OnOffButton';
import useCommunityDetail from '@/hooks/queries/community/useCommunityDetail';
import useWritePost from '@/hooks/queries/useWritePost';
import useWriteUpdate from '@/hooks/queries/useWriteUpdate';
import useCommunityData from '@/store/useCommunityData';

import CustomButton from '../../../components/button/CustomButton';
import InputTag from '../../../components/write/communtiy/InputTag';
import TitleEditor from '../../../components/write/TextEditor/TitleEditor';

const TextEditor = dynamic(
  () =>
    import('@/components/write/TextEditor/TextEditor').then(
      (mod) => mod.default
    ),
  { ssr: false }
);

const COMMNUITYLIST = [
  { key: 'QNA', name: 'QnA' },
  { key: 'CHAT', name: '수다' },
  { key: 'CONCERN', name: '고민' },
];

export default function CommunityWrite() {
  const { category, title, content, hashTags, images, setter } =
    useCommunityData();
  const router = useRouter();
  const { id } = router.query;

  const communityData = {
    category,
    title,
    content,
    hashTags,
    images,
  };

  const { isLoading, isError, data, isFetching } = useCommunityDetail(
    id as string
  );
  const { mutate: communityPost } = useWritePost('community', communityData);
  const { mutate: communityUpdate } = useWriteUpdate(
    parseInt(id as string),
    'community',
    communityData
  );

  useEffect(() => {
    if (!isLoading && id) {
      setter.setCategory(data.category);
      setter.setTitle(data.title);
      setter.setContent(data.content);
      const hashTags: string[] = [];
      data?.hashTags.map((item: { hashTagId: number; hashTag: string }) => {
        hashTags.push(item.hashTag);
      });
      setter.setHashTags(hashTags);
      if (data.images && data.images.length > 0) {
        data.images.map((item: string) => {
          setter.setImages(item);
        });
      }
    } else {
      setter.setCategory('QNA');
      setter.setTitle('');
      setter.setContent('');
      setter.setHashTags([]);
      // setter.setImages('');
    }
  }, [isFetching, id]);

  return (
    <main>
      <section className="max-w-max_w min-w-min_w min-h-min_h m-auto p-20 mobile:p-6">
        <h1 className="text-center text-[2rem] font-bold">
          자유롭게 글을 작성해주세요
        </h1>
        <ul className="my-20">
          <li className="mt-14">
            <h2 className="text-bs_20 mb-5 font-bold">커뮤니티 분류</h2>

            <OnoffButton
              value={category}
              setValue={setter.setCategory}
              list={COMMNUITYLIST}
            />
          </li>
          <li className="mt-14">
            <h2 className="text-bs_20 mb-5 font-bold">태그</h2>
            <InputTag
              value={hashTags}
              setValue={
                setter.setHashTags as (value: string | string[]) => void
              }
            />
          </li>
          <li className="mt-14">
            <TitleEditor title={title} setTitle={setter.setTitle} />
            <TextEditor
              values={content}
              setValues={setter.setContent}
              setImages={setter.setImages}
            />
          </li>
          <li className="text-right mt-10">
            <CustomButton className="py-3 px-10 mr-3">취소</CustomButton>
            <CustomButton
              color="secondary"
              className="py-3 px-10"
              onClick={() => {
                if (id && data.id) {
                  communityUpdate();
                } else {
                  communityPost();
                }
              }}>
              작성
            </CustomButton>
          </li>
        </ul>
      </section>
    </main>
  );
}
