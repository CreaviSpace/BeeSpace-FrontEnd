export const parseEnum = (type: string) => {
  switch (type) {
    // 커뮤니티 게시글:
    case 'QnA':
      return 'QNA';
    case '수다':
      return 'CHAT';
    case '고민':
      return 'CONCERN';
    // 프로젝트 게시글
    // case '팀':
    //   return 'TEAM';
    // case '개인':
    //   return 'INDIVIDUAL';
    // 모집 게시글
    case '프로젝트모집':
      return 'PROJECT_RECRUIT';
    case '스터디':
      return 'STUDY';
    // 포지션
    case '디자인': // 디자이너
      return 'DESIGNER';
    case '백엔드':
      return 'BACKEND_DEVELOPER';
    case '프론트엔드':
      return 'FRONTEND_DEVELOPER';
    case '기획': // 기획자
      return 'PLANNER';
    // 신고 종류
    case '스팸':
      return 'SPAM';
    case '음란물':
      return 'PORNOGRAPHY';
    case '폭력':
      return 'VIOLENCE';
    case '혐오발언':
      return 'HATE_SPEECH';
    case '개인정보 유출':
      return 'PERSONAL_INFORMATION_DISCLOSURE';
    case '부적절한 콘텐츠':
      return 'INAPPROPRIATE_CONTENT';
    // 정렬 순서
    // case '최신활동순':
    //   return 'LATEST_ACTIVITY';
    // case '추천순':
    //   return 'RECOMMENDED';
    // case '조회수순':
    //   return 'MOST_VIEWED';
    // 모집게시글 연락방법
    case '오픈톡':
      return 'OPENTALK';
    case '이메일':
      return 'EMAIL';
    case '구글폼':
      return 'GOOGLE_FORM';
    // 모집게시글 진행방식
    // case '온라인':
    //   return 'ONLINE';
    // case '오프라인':
    //   return 'OFFLINE';
    // case '온/오프라인':
    //   return 'ON_OFFLINE';
    // 피드맥 질문
    // case '주관식':
    //   return 'SUBJECTIVE';
    // case '객관식':
    //   return 'OBJECTIVE';
    // case '체크박스':
    //   return 'CHECKBOX';
    default:
      return 'default';
  }
};
