import { AiOutlineSearch } from '@react-icons/all-files/ai/AiOutlineSearch';

export default function SearchBar() {
  return (
    <section className="w-full px-3">
      <div className="w-full flex items-center bg-blue10 py-3 px-5">
        <input
          type="text"
          placeholder="검색어를 입력해주세요."
          className="w-full bg-blue10 outline-none"
        />
        <AiOutlineSearch size={25} className="" />
      </div>
    </section>
  );
}
