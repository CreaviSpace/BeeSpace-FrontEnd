function debounce(callback: () => void, timeout: number = 300) {
  let cleanup: NodeJS.Timeout | undefined;
  return () => {
    clearTimeout(cleanup);
    cleanup = setTimeout(callback, timeout);
  };
}

export default debounce;
