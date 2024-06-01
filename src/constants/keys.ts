const queryKeys = {
  // 로그인
  AUTH: 'auth',
  // 관리자(어드민)
  ADMIN: 'admin',
  ADMIN_MEMBER: 'admin-member',
  ADMIN_CONTENT: 'admin-content',
  ADMIN_STATISTICS: 'admin-statistics',
  ADMIN_REPORT: 'admin_report',
  // 알람
  ALARM: 'alarm',
  ALARM_COUNT: 'alarm-counts',
  // 댓글
  COMMENT: 'comment',
  // 커뮤니티
  COMMUNITY: 'community',
  COMMUNITY_DETAIL: 'community_detail',
  // 피드백
  FEEDBACK_ANALYSIS: 'feedback_analysis',
  FEEDBACK: 'feedback',
  // 프로필
  PROFILE_MY: 'profile-my',
  PROFILE_MEMBER: 'profile-member',
  PROFILE_CONTENT: 'profile-content',
  // 프로젝트
  PROJECT: 'project',
  PROJECT_DETAIL: 'project-detail',
  // 모집
  RECRUIT: 'recruit',
  RECRUIT_DETAIL: 'recruit-detail',
  // 배너
  BANNER: 'banner',
  // 북마크
  BOOKMARK: 'bookmark',
  // 좋아요
  LIKE: 'like',
  LIKE_VIEW: 'like-view',
  // 맵버 검색
  MEMBER_SEARCH: 'member-search',
  // 해시 태그
  HASH_TAG: 'hash-tag',
  // 검색
  SEARCH: 'search',
  // 기술스택
  TEACH_STACK: 'tech-stack',
} as const;

export { queryKeys };
