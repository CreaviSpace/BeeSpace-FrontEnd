export const postCookies = ({ ...cookies }) => {
  try {
    Object.entries(cookies).forEach(([key, value]) => {
      document.cookie = `${key}=${value}; max-age=7200; path=/;`; // 7200
    });
  } catch (error) {
    console.error(error);
  }
};
