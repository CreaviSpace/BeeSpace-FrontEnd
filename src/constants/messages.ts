const errorMessages = {
  AUTH_TOKEN_EXPIRED: '로그인 해주세요!',
  TRY_AUTH_TOKEN_EXPIRED:
    '인증 정보가 만료되었습니다.' + '\n' + '다시 시도하세요.',
  TRY_AGAIN: '다시 시도해주세요!',
} as const;

export { errorMessages };
