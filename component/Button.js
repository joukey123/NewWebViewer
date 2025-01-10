import { Tooltip } from "@mui/material";
import styled from "styled-components";

const ButtonBox = styled.div`
  width: 25px; /* 버튼 크기 */
  height: 25px;
  background: url(${(props) =>
    props.$disabled
      ? `https://mempro.co.kr:85/image/icon/${props.$type}_disabled.png`
      : `https://mempro.co.kr:85/image/icon/${props.$type}.png`});
  background-size: contain; /* 이미지 크기 조정 */
  background-repeat: no-repeat; /* 반복 방지 */
  background-position: center; /* 중앙 정렬 */
  cursor: ${(props) =>
    props.$disabled === false && "pointer"}; /* 클릭 가능하도록 포인터 표시 */
`;

function Button({ direction, onClick, disabled, tooltip }) {
  return tooltip ? (
    <Tooltip
      title={direction}
      leaveDelay={100}
      componentsProps={{
        tooltip: {
          style: {
            fontSize: "12px", // 텍스트 크기
            padding: "10px", // 패딩
            maxWidth: "250px", // 최대 너비
            textTransform: "capitalize",
            backgroundColor: "rgba(0,0,0,0.8)",
            color: "white",
          },
        },
      }}
    >
      <ButtonBox $type={direction} onClick={onClick} $disabled={disabled} />
    </Tooltip>
  ) : (
    <ButtonBox $type={direction} onClick={onClick} $disabled={disabled} />
  );
}

export default Button;
