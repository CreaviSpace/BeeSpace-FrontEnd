export const GotoSlider = (ref_all: HTMLDivElement, index: number) => {
  ref_all.style.transition = '0.3s all';
  ref_all.style.right = `${100 * index}%`;
};

export const BtnPrev = (
  ref_all: HTMLDivElement,
  currentIndex: number,
  setCurrentIndex: (index: number) => void
) => {
  if (ref_all && currentIndex > 0) {
    GotoSlider(ref_all, currentIndex - 1);
    setCurrentIndex(currentIndex - 1);
  }
};

export const BtnNext = (
  ref_all: HTMLDivElement,
  currentIndex: number,
  setCurrentIndex: (index: number) => void,
  length: number
) => {
  if (ref_all && currentIndex <= length) {
    GotoSlider(ref_all, currentIndex + 1);
    setCurrentIndex(currentIndex + 1);
  }
};

export const Clicklist = (
  ref_all: HTMLDivElement,
  currentIndex: number,
  setCurrentIndex: (index: number) => void
) => {
  if (ref_all) {
    GotoSlider(ref_all, currentIndex);
    setCurrentIndex(currentIndex);
  }
};

export const TransitionEnd = (
  ref_all: HTMLDivElement,
  currentIndex: number,
  setCurrentIndex: (index: number) => void,
  length: number
) => {
  if (ref_all) {
    ref_all.style.transition = 'none';
    if (currentIndex === 0) {
      ref_all.style.right = `${length * 100}%`;
      setCurrentIndex(length);
    }
    if (currentIndex === length + 1) {
      ref_all.style.right = `${1 * 100}%`;
      setCurrentIndex(1);
    }
  }
};
