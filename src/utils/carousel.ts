export const GotoSlider = (
  ref_all: HTMLDivElement,
  ref_one: HTMLDivElement,
  index: number
) => {
  ref_all.style.transition = '0.3s all';
  ref_all.style.right = `${ref_one.offsetWidth * index}px`;
};

export const BtnPrev = (
  ref_all: HTMLDivElement,
  ref_one: HTMLDivElement,
  currentIndex: number,
  setCurrentIndex: (index: number) => void
) => {
  if (ref_all && ref_one && currentIndex > 0) {
    GotoSlider(ref_all, ref_one, currentIndex - 1);
    setCurrentIndex(currentIndex - 1);
  }
};

export const BtnNext = (
  ref_all: HTMLDivElement,
  ref_one: HTMLDivElement,
  currentIndex: number,
  setCurrentIndex: (index: number) => void,
  length: number
) => {
  if (ref_all && ref_one && currentIndex <= length) {
    GotoSlider(ref_all, ref_one, currentIndex + 1);
    setCurrentIndex(currentIndex + 1);
  }
};

export const Clicklist = (
  ref_all: HTMLDivElement,
  ref_one: HTMLDivElement,
  currentIndex: number,
  setCurrentIndex: (index: number) => void
) => {
  if (ref_all && ref_one) {
    GotoSlider(ref_all, ref_one, currentIndex);
    setCurrentIndex(currentIndex);
  }
};

export const TransitionEnd = (
  ref_all: HTMLDivElement,
  ref_one: HTMLDivElement,
  currentIndex: number,
  setCurrentIndex: (index: number) => void,
  length: number
) => {
  if (ref_all && ref_one) {
    ref_all.style.transition = 'none';
    if (currentIndex === 0) {
      ref_all.style.right = `${length * ref_one.offsetWidth}px`;
      setCurrentIndex(length);
    }
    if (currentIndex === length + 1) {
      ref_all.style.right = `${1 * ref_one.offsetWidth}px`;
      setCurrentIndex(1);
    }
  }
};
