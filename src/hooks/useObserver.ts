import { useCallback, useRef } from 'react';

const useObserver = (
  isFetchingNextPage: boolean,
  isError: boolean,
  fetchNextPage: () => void
): ((node: HTMLElement | null) => void) => {
  const observer: React.MutableRefObject<IntersectionObserver | null> =
    useRef(null);
  const observerRef = useCallback(
    (node: HTMLElement | null) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !isError) {
            fetchNextPage();
          }
        },
        { threshold: 0.7 }
      );
      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage]
  );

  return observerRef;
};

export default useObserver;
