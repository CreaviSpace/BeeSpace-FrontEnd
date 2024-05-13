export const parseValue = (type: string) => {
  switch (type) {
    case 'all':
      return '전체';
    case 'PROJECT':
      return '프로젝트';
    case 'RECRUIT':
      return '모집';
    case 'COMMUNITY':
      return '커뮤니티';
    // 커뮤니티 게시글:
    case 'QNA':
      return 'QNA';
    case 'CHAT':
      return '수다';
    case 'CONCERN':
      return '고민';
    // 프로젝트 게시글
    case 'TEAM':
      return '팀';
    case 'INDIVIDUAL':
      return '개인';
    // 모집 게시글
    case 'PROJECT_RECRUIT':
      return '프로젝트모집';
    case 'STUDY':
      return '스터디';
    // 포지션
    case 'DESIGNER': // 디자이너
      return '디자인';
    case 'BACKEND_DEVELOPER':
      return '백엔드';
    case 'FRONTEND_DEVELOPER':
      return '프론트엔드';
    case 'PLANNER': // 기획자
      return '기획';
    // 신고 종류
    case 'SPAM':
      return '스팸';
    case 'PORNOGRAPHY':
      return '음란물';
    case 'VIOLENCE':
      return '폭력';
    case 'HATE_SPEECH':
      return '혐오발언';
    case 'PERSONAL_INFORMATION_DISCLOSURE':
      return '개인정보 유출';
    case 'INAPPROPRIATE_CONTENT':
      return '부적절한 콘텐츠';
    // 정렬 순서
    case 'LATEST_ACTIVITY':
      return '최신활동순';
    case 'RECOMMENDED':
      return '추천순';
    case 'MOST_VIEWED':
      return '조회수순';
    // 모집게시글 연락방법
    case 'OPENTALK':
      return '오픈톡';
    case 'EMAIL':
      return '이메일';
    case 'GOOGLE_FORM':
      return '구글폼';
    // 모집게시글 진행방식
    case 'ONLINE':
      return '온라인';
    case 'OFFLINE':
      return '오프라인';
    case 'ON_OFFLINE':
      return '온/오프라인';
    // 피드맥 질문
    case 'SUBJECTIVE':
      return '주관식';
    case 'OBJECTIVE':
      return '객관식';
    case 'CHECKBOX':
      return '체크박스';
    default:
      return 'default';
  }
};
