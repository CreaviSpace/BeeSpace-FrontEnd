const errorMessages = {
  AUTH_TOKEN_EXPIRED: '로그인 해주세요!',
  UNEXPECT_ERROR: '알 수 없는 에러가 발생했습니다.',
  TRY_AUTH_TOKEN_EXPIRED:
    '인증 정보가 만료되었습니다.' + '\n' + '다시 시도하세요.',
  TRY_AGAIN: '다시 시도해주세요!',
} as const;

const successMessages = {
  REPORT_CREATE: '신고가 되었습니다.',
  POST_CREATE: '글쓰기를 성공했습니다.',
  POST_UPDATE: '글수정을 성공했습니다.',
  PROFILE_UPDATE: '프로필 수정을 성공했습니다.',
  FEEDBACK_UPDATE: '피드백 수정을 성공했습니다.',
} as const;

export { errorMessages, successMessages };
