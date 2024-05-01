function throttle(callback: () => void, timeout = 300) {
  let timer: NodeJS.Timeout | null = null;
  return () => {
    if (!timer) {
      timer = setTimeout(() => {
        callback();
        timer = null;
      }, timeout);
    }
  };
}

export default throttle;
