import dynamic from 'next/dynamic';
import { useEffect } from 'react';

import OnoffButton from '@/components/button/OnOffButton';
import useCommunityDetail from '@/hooks/useCommunityDetail';
import useWritePost from '@/hooks/useWritePost';
import useWriteUpdate from '@/hooks/useWriteUpdate';
import useCommunityData from '@/store/useCommunityData';

import CustomButton from '../button/CustomButton';
import InputTag from './communtiy/InputTag';
import TitleEditor from './TextEditor/TitleEditor';

const TextEditor = dynamic(
  () =>
    import('@/components/write/TextEditor/TextEditor').then(
      (mod) => mod.default
    ),
  { ssr: false }
);

interface ICommunityWriteProps {
  id: string | undefined;
}

export default function CommunityWrite({ id }: ICommunityWriteProps) {
  const commnuityList = [
    { key: 'QNA', name: 'QnA' },
    { key: 'CHAT', name: '수다' },
    { key: 'CONCERN', name: '고민' },
  ];

  const { category, title, content, hashTags, setter } = useCommunityData();

  const communityData = {
    category,
    title,
    content,
    hashTags,
  };

  const { isLoading, isError, data, isFetching } = useCommunityDetail(id);
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
    } else {
      setter.setCategory('QNA');
      setter.setTitle('');
      setter.setContent('');
      setter.setHashTags([]);
    }
  }, [isFetching, id]);

  return (
    <main>
      <section className="max-w-max_w m-auto p-20">
        <h1 className="text-center text-[2rem] font-bold">
          자유롭게 글을 작성해주세요
        </h1>
        <ul className="my-20">
          <li className="mt-14">
            <h2 className="text-bs_20 mb-5 font-bold">커뮤니티 분류</h2>

            <OnoffButton
              value={category}
              setValue={setter.setCategory}
              list={commnuityList}
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
            <TextEditor values={content} setValues={setter.setContent} />
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
