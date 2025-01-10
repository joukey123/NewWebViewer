import { useRecoilState, useRecoilValue } from "recoil";
import {
  currentPage,
  openThumnail,
  pdfPage,
  saveScrollPosition,
} from "../atoms";
import { Document, Page } from "react-pdf";
import mkmetalpdf from "../MK_Metal.pdf";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";

const StyledDocument = styled(Document)`
  display: grid;
  overflow-x: scroll;
  grid-auto-flow: column;
  width: 100%;
`;

const ThumnailBox = styled.div`
  border: ${(props) =>
    props.$isClick ? "1.5px solid #014EA2" : "1px solid #ddd"};
  border-radius: 4px;
  padding: 5px;
  text-align: center;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function ThumnailViewer() {
  const [numPages, setNumPages] = useRecoilState(pdfPage);
  const [pageNumber, setPageNumber] = useRecoilState(currentPage);
  const [scrollPosition, setScrollPosition] =
    useRecoilState(saveScrollPosition); // 스크롤 위치 상태 추가
  const thumbnailRefs = useRef([]); // 썸네일 ref 배열

  const goToPageNumber = (index) => {
    const pageNumbers = index + 1;
    if (pageNumbers === 1 || pageNumbers === 20 || pageNumbers === 21) {
      setPageNumber(pageNumbers);
    } else if (pageNumbers % 2 === 1) {
      setPageNumber(pageNumbers - 1);
    } else {
      setPageNumber(pageNumbers);
    }
  };

  useEffect(() => {
    // 페이지가 변경되면 해당 썸네일이 화면에 보이지 않으면 스크롤 이동
    if (thumbnailRefs.current[pageNumber - 1]) {
      thumbnailRefs.current[pageNumber - 1].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [pageNumber]);

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
      }}
    >
      <StyledDocument file={mkmetalpdf}>
        {Array.from(new Array(numPages), (_, index) => (
          <ThumnailBox
            key={`thumbnail-${index}`}
            onClick={() => goToPageNumber(index)}
            $isClick={
              pageNumber === 1 || pageNumber === 20 || pageNumber === 21
                ? pageNumber === index + 1
                : pageNumber === index + 1 || pageNumber === index
            }
            ref={(el) => (thumbnailRefs.current[index] = el)}
          >
            <Page
              pageNumber={index + 1}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              scale={0.15} // 썸네일 크기 조정 (작게 보이도록 설정)
            />
            <p style={{ marginTop: "5px", fontSize: "16px" }}>{index + 1}</p>
          </ThumnailBox>
        ))}
      </StyledDocument>
    </div>
  );
}

export default ThumnailViewer;
