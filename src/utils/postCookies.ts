export const postCookies = ({ ...cookies }) => {
  try {
    document.cookie = `jwt=${cookies.jwt}; max-age=3600;`;
    document.cookie = `MID=${cookies.memberId}; max-age=3600;`;
    document.cookie = `OLD=${cookies.old}; max-age=3600;`;
  } catch (error) {
    console.error(error);
  }
};
