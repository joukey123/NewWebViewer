import { useControls } from "react-zoom-pan-pinch";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  handleZoomRange,
  isZoomClick,
  scaleValue,
  windowSizeState,
} from "../atoms";
import { useEffect, useState } from "react";
import Button from "../component/Button";
import styled from "styled-components";
import { Slide } from "@mui/material";

const InputBox = styled.div`
  height: 40px;
  position: absolute;
  top: 45px;
  left: -60px;
  min-width: 250px;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0, 0, 0, 0.2);
  background-color: white;
  box-shadow: 2px 1px 10px rgba(0, 0, 0, 0.1);
`;
const Input = styled.input`
  -webkit-appearance: none;
  width: 150px;
  height: 1.5px;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.8);
  position: relative;
  margin-right: 20px;
  &::-webkit-slider-thumb {
    -webkit-appearance: none; /* 기본 스타일 제거 */
    width: 18px; /* 손잡이 너비 */
    height: 18px; /* 손잡이 높이 */
    border: 1.5px solid black;
    background-color: white;
    border-radius: 50%; /* 둥근 손잡이 */
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2); /* 그림자 */
    cursor: pointer; /* 커서 모양 */
    &:active {
      background-color: rgba(0, 0, 0, 1);
    }
  }
`;

function Zoom() {
  const { zoomIn, zoomOut, setTransform } = useControls();
  const [isZoom, setIsZoom] = useRecoilState(isZoomClick);
  const [zoomValue, setZoomValue] = useRecoilState(scaleValue);
  const [percentValue, setPercentValue] = useState(zoomValue);
  const [showSlider, setShowSlider] = useRecoilState(handleZoomRange);

  const windowSize = useRecoilValue(windowSizeState);

  const handelZoom = (direction) => {
    setShowSlider(true);

    if (direction === "In") {
      zoomIn(0.25, 200, "easeOut");
    } else {
      zoomOut(0.25, 200, "easeOut");
    }
    setIsZoom((prev) => !prev);
  };

  const handleChange = (e) => {
    setZoomValue(e.target.value);
  };
  useEffect(() => {
    const percent = () => {
      setPercentValue(Math.floor(zoomValue * 100));
    };
    percent();
  }, [zoomValue]);
  const handleRangeChange = (e) => {
    const newValue = parseFloat(e.target.value);
    setZoomValue(newValue); // 상태 업데이트
    setTransform(windowSize.width, windowSize.height, newValue, 200, "easeOut"); // 줌 변경
  };

  return (
    <div
      className="zoom "
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <div
        style={{
          marginRight: 30,
        }}
        className=" MenuButtonPadding"
      >
        <Button
          direction={"zoomout"}
          onClick={() => handelZoom("Out")}
          tooltip={true}
          disabled={false}
        />
        {/* <div onClick={() => handelZoom("Out")}>-</div> */}
      </div>
      <div>{/* <input value={zoomValue} readOnly /> */}</div>
      <div className="MenuButtonPadding">
        <Button
          direction={"zoomin"}
          onClick={() => handelZoom("In")}
          tooltip={true}
          disabled={false}
        />
      </div>

      <Slide in={showSlider} mountOnEnter unmountOnExit direction="down">
        <InputBox className="inputBox">
          <Input
            type="range"
            min=".5" // 최소 줌 값 (필요에 따라 변경)
            max="3" // 최대 줌 값 (필요에 따라 변경)
            step=".25" // 줌 단위
            value={zoomValue}
            onChange={handleRangeChange}
            list="markers"
          />
          <div
            style={{
              borderLeft: "1.5px solid #014EA2",
              width: "5%",
              height: "50%",
            }}
          ></div>
          <span>{percentValue}%</span>
        </InputBox>
      </Slide>
    </div>
  );
}

export default Zoom;
