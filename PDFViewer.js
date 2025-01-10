import React, { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import mkmetalpdf from "./MK_Metal.pdf";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  currentPage,
  endPage,
  isZoomClick,
  pdfPage,
  scaleValue,
} from "./atoms";
import {
  TransformComponent,
  useTransformComponent,
} from "react-zoom-pan-pinch";
import styled from "styled-components";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const StyledPage = styled(Page)`
  border: 0.5px solid rgba(0, 0, 0, 0.3);
  box-shadow: 1px 10px 10px rgba(0, 0, 0, 0.05);
`;

function PDFViewer({ centerView }) {
  const [numPages, setNumPages] = useRecoilState(pdfPage);

  // const [pageNumber, setPageNumber] = useState(1);
  const [pageNumber, setPageNumber] = useRecoilState(currentPage);
  const [totalPages, setTotalPages] = useRecoilState(endPage);
  const [zoomValue, setZoomValue] = useRecoilState(scaleValue);
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setTotalPages(numPages);
  }

  const CurrentScale = () => {
    const transformedComponent = useTransformComponent(
      ({ state, instance }) => {
        setZoomValue(state.scale);
      }
    );
    return transformedComponent;
  };

  return (
    <TransformComponent>
      <CurrentScale />
      <div
        style={{
          display: "flex",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Document file={mkmetalpdf} onLoadSuccess={onDocumentLoadSuccess}>
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
            }}
          >
            {pageNumber === 1 || pageNumber === 20 || pageNumber === 21 ? (
              <StyledPage
                pageNumber={pageNumber}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            ) : pageNumber === numPages ? (
              <StyledPage
                pageNumber={numPages}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            ) : (
              <>
                <StyledPage
                  pageNumber={pageNumber}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
                <StyledPage
                  pageNumber={pageNumber + 1}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              </>
            )}
          </div>
        </Document>
      </div>
    </TransformComponent>
  );
}

export default PDFViewer;
