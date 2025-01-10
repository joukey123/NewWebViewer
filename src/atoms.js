import { atom } from "recoil";

export const pdfPage = atom({
  key: "pdfPage",
  default: null,
});
export const currentPage = atom({
  key: "currentPage", // 고유한 key
  default: 1, // 초기 값
});
export const endPage = atom({
  key: "endPage", // 고유한 key
  default: 0, // 초기 값
});

export const scaleValue = atom({
  key: "scaleValue",
  default: 1,
});

export const isZoomClick = atom({
  key: "isZoomClick",
  default: false,
});

export const isFull = atom({
  key: "isFull",
  default: false,
});

export const handleCenterFunction = atom({
  key: "handleCenterFunction",
  default: () => {},
});

export const openThumnail = atom({
  key: "openThumnail",
  default: false,
});

export const saveScrollPosition = atom({
  key: "saveScrollPosition",
  default: 0,
});

export const windowSizeState = atom({
  key: "windowSizeState", // 고유한 키
  default: {
    width: (window.innerWidth - 595) / 2,
    height: (window.innerHeight - 841 - 120) / 2,
  },
});

export const handleZoomRange = atom({
  key: "handleZoomRange",
  default: false,
});
