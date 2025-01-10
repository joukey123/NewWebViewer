import styled from "styled-components";
import Controll from "./Controll";
import Menu from "./Menu";
import PDFViewer from "./PDFViewer";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import "./App.css";
import {
  TransformComponent,
  TransformWrapper,
  useTransformComponent,
} from "react-zoom-pan-pinch";
import { use, useEffect, useRef, useState } from "react";
import {
  currentPage,
  handleCenterFunction,
  handleZoomRange,
  isZoomClick,
  openThumnail,
  scaleValue,
  windowSizeState,
} from "./atoms";
import ThumnailViewer from "./Menu/TunmailViewer";
import { Slide } from "@mui/material";
import HTMLFlipBook from "react-pageflip";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh; /* 전체 뷰포트 높이 */
  overflow: hidden;
`;
const MenuContainer = styled.div`
  flex: 1 1 auto; /* 높이를 유연하게 조정 */
  min-height: 60px;
`;
const PDFViewerContainer = styled.div`
  height: calc(100vh);
  min-height: clamp(600px, 80vh, 1260px); /* 작은 화면에서 유연하게 */
`;
const ControllContainer = styled.div`
  flex: 1 1 auto; /* 높이를 유연하게 조정 */
  min-height: 60px;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
`;

function App() {
  const transformWrapperRef = useRef(null);
  // const [windowSize, setWindowSize] = useState({
  //   width: (window.innerWidth - 595) / 2,
  //   height: (window.innerHeight - 841 - 120) / 2,
  // });
  const [windowSize, setWindowSize] = useRecoilState(windowSizeState);

  const [zoomValue, setZoomValue] = useRecoilState(scaleValue);
  const [isZoom, setIsZoom] = useRecoilState(isZoomClick);
  const [showSlider, setShowSlider] = useRecoilState(handleZoomRange);

  const centerFuncion = useRecoilValue(handleCenterFunction);
  const isOpenThumnail = useRecoilValue(openThumnail);
  const page = useRecoilValue(currentPage);
  const pdfRef = useRef();

  // useEffect(() => {
  //   const transformValue =
  //     pdfRef.current.children[0].children[0].style.transform;
  //   const scaleMatch = transformValue.match(/scale\(([^)]+)\)/);
  //   const value = scaleMatch ? scaleMatch[1] : null;
  //   setZoomValue(value);
  //   console.log(zoomValue, "zoom");
  // }, [isZoom]);

  useEffect(() => {
    const handleCenter = () => {
      if (page === 1 || page === 20 || page === 21) {
        setWindowSize({
          width: (window.innerWidth - 595 * zoomValue) / 2,
          height:
            (window.innerHeight -
              841 * zoomValue -
              120 -
              (isOpenThumnail ? 175 : 0)) /
            2,
        });
      } else {
        setWindowSize({
          width: (window.innerWidth - 595 * zoomValue * 2) / 2,
          height:
            (window.innerHeight -
              841 * zoomValue -
              120 -
              (isOpenThumnail ? 175 : 0)) /
            2,
        });
      }
    };
    handleCenter();
  }, [page, isOpenThumnail, zoomValue]);

  useEffect(() => {
    const handleResize = () => {
      if (page === 1 || page === 20 || page === 21) {
        setWindowSize({
          width: (window.innerWidth - 595 * zoomValue) / 2,
          height:
            (window.innerHeight -
              841 * zoomValue -
              120 -
              (isOpenThumnail ? 175 : 0)) /
            2,
        });
      } else {
        setWindowSize({
          width: (window.innerWidth - 595 * zoomValue * 2) / 2,
          height:
            (window.innerHeight -
              841 * zoomValue -
              120 -
              (isOpenThumnail ? 175 : 0)) /
            2,
        });
      }
    };
    pdfRef.current.children[0].children[0].style.transform = `translate(${windowSize.width}px, ${windowSize.height}px) scale(${zoomValue})`;
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowSize]);

  return (
    <>
      <AppContainer>
        <TransformWrapper
          initialPositionX={windowSize.width}
          initialPositionY={windowSize.height}
          initialScale={1}
          minScale={0.5}
          maxScale={3}
          ref={transformWrapperRef}
          doubleClick={{ disabled: true }}
          wheel={{ disabled: true }}
        >
          <MenuContainer>
            <Menu />
          </MenuContainer>
          <PDFViewerContainer ref={pdfRef} onClick={() => setShowSlider(false)}>
            <PDFViewer />
          </PDFViewerContainer>
          <Slide in={isOpenThumnail} mountOnEnter unmountOnExit direction="up">
            <div style={{ display: "flex" }}>
              <ThumnailViewer />
            </div>
            <div></div>
          </Slide>
          <ControllContainer>
            <Controll />
          </ControllContainer>
        </TransformWrapper>
      </AppContainer>
    </>
  );
}

export default App;
