export default function Header() {
  return (
    <header className="border border-red-500">
      <nav className="w-full h-fit flex">
        <h1>로고</h1>
        <ul>
          <li>프로젝트</li>
          <li>모집</li>
          <li>커뮤니티</li>
        </ul>
        <ul>
          <li>검색</li>
          <li>로그인</li>
          <li>회원가입</li>
        </ul>
      </nav>
    </header>
  );
}
