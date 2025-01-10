import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { currentPage, endPage } from "./atoms";
import { useCallback, useEffect, useRef, useState } from "react";
import { useControls } from "react-zoom-pan-pinch";
import Button from "./component/Button";

const ControllBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ControllButton = styled.div`
  margin: 0 10px;
  padding: 5px;
  cursor: ${(props) => (props.$disabled ? "default" : "pointer")};
  &:hover {
    background-color: ${(props) =>
      props.$disabled ? "default" : "rgba(0, 0, 0, 0.1)"};
  }
`;
function Controll() {
  const [pageNumber, setPageNumber] = useRecoilState(currentPage);
  const totalPage = useRecoilValue(endPage);
  const [inputValue, setInputValue] = useState(1);

  useEffect(() => {
    setInputValue(pageNumber);
  }, [pageNumber]);

  const handleKeyPageMove = useCallback(
    (e) => {
      console.log("Key pressed:", e.key);
      if (e.key === "ArrowRight") {
        changePage("next");
      } else if (e.key === "ArrowLeft") {
        changePage("prev");
      }
    },
    [] // 최신 changePage 참조
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPageMove);
    return () => {
      window.removeEventListener("keydown", handleKeyPageMove);
    };
  }, []);

  const changePage = (direction) => {
    setPageNumber((prevPage) => {
      if (direction === "next") {
        return prevPage >= 21
          ? prevPage
          : prevPage === 1 || prevPage === 20
          ? prevPage + 1
          : prevPage + 2;
      } else if (direction === "prev") {
        return prevPage <= 1
          ? prevPage
          : prevPage === 2 || prevPage === 21
          ? prevPage - 1
          : prevPage - 2;
      } else if (direction === "home") {
        return 1;
      } else if (direction === "end") {
        return totalPage;
      }
      return prevPage; // 잘못된 direction이 들어오면 현재 페이지 유지
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // 엔터키 눌렀을 때 새로고침 방지
      const stringToNumber = Number(inputValue);
      if (stringToNumber === 0 || stringToNumber < 0) {
        alert("첫페이지로 이동합니다.");
        setPageNumber(1);
        setInputValue(1);
        return;
      }
      if (stringToNumber > totalPage) {
        alert(`마지막 페이지는 ${totalPage}입니다.`);
        setPageNumber(totalPage);
        setInputValue(totalPage);
        return;
      }
      if (
        stringToNumber % 2 !== 0 &&
        stringToNumber !== 1 &&
        stringToNumber !== 21
      ) {
        setPageNumber(stringToNumber - 1);
      } else {
        setPageNumber(stringToNumber);
      }
    }
  };

  return (
    <ControllBox>
      <ControllButton $disabled={pageNumber <= 1}>
        <Button
          direction={"back"}
          onClick={() => changePage("home")}
          disabled={pageNumber <= 1}
        />
      </ControllButton>
      <ControllButton $disabled={pageNumber <= 1}>
        <Button
          direction={"prev"}
          onClick={() => changePage("prev")}
          disabled={pageNumber <= 1}
        />
      </ControllButton>
      {/* <button disabled={pageNumber <= 1} onClick={() => changePage("home")}>
        Home
      </button>
      <button disabled={pageNumber <= 1} onClick={() => changePage("prev")}>
        Previous
      </button> */}
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown} // 엔터키 이벤트를 처리
        min={1}
        style={{
          width: "30px",
          height: "30px",
          textAlign: "center",
          margin: "0 10px",
          fontSize: "15px",
          outline: 0,
        }}
      />
      <span style={{ margin: "0 10px" }}>{totalPage} </span>
      <ControllButton $disabled={pageNumber >= totalPage}>
        <Button
          direction={"next"}
          onClick={() => changePage("next")}
          disabled={pageNumber >= totalPage}
        />
      </ControllButton>
      <ControllButton $disabled={pageNumber >= totalPage}>
        <Button
          direction={"end"}
          onClick={() => changePage("end")}
          disabled={pageNumber >= totalPage}
        />
      </ControllButton>
      {/* <button
        disabled={pageNumber >= totalPage}
        onClick={() => changePage("next")}
      >
        Next
      </button>
      <button
        disabled={pageNumber >= totalPage}
        onClick={() => changePage("end")}
      >
        End
      </button> */}
    </ControllBox>
  );
}

export default Controll;
