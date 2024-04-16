import { useRouter } from 'next/router';

interface IWriteModalProps {}

export default function WriteModal({}: IWriteModalProps) {
  const router = useRouter();
  return (
    <li
      className="w-40 h-fit bg-white border rounded-bs_10 shadow-md absolute top-[2.8125rem] right-0 flex flex-col gap-y-3 p-4 text-bs_14"
      onMouseDown={(e) => {
        e.preventDefault();
      }}>
      <label
        htmlFor="write"
        className="text-center font-bold text-bs_16 hidden min_mobile:block">
        글 작성
      </label>
      <button
        className="text-start"
        onClick={() => router.push('/write/project')}>
        프로젝트 올리기
      </button>
      <button
        className="text-start"
        onClick={() => router.push('/write/recruitment')}>
        팀원 모집하기
      </button>
      <button
        className="text-start"
        onClick={() => router.push('/write/community')}>
        커뮤니티 글쓰기
      </button>
    </li>
  );
}
