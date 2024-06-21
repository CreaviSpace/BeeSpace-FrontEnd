import { useState } from 'react';

function useButtonDebounce<T>(delay: number) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = async (onClick: T, order: boolean = true) => {
    if (!isClicked && typeof onClick === 'function') {
      setIsClicked(true);
      if (order) onClick();

      await new Promise((resolve) => setTimeout(resolve, delay));
      if (!order) onClick();

      setIsClicked(false);
    }
  };

  return handleClick;
}

export default useButtonDebounce;
