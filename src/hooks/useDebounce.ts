import { useCallback, useEffect, useMemo, useState } from 'react';

function useDebounce<T>(value: T, delay: number) {
  const [debounceValue, setDebouncedValue] = useState(value);

  const updateDebouncedValue = useCallback(() => {
    setDebouncedValue(value);
  }, [value]);

  useEffect(() => {
    const timer = setTimeout(updateDebouncedValue, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [delay, updateDebouncedValue]);

  return useMemo(() => debounceValue, [debounceValue]);
}

export default useDebounce;
