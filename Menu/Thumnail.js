import { useRecoilState } from "recoil";
import { openThumnail, saveScrollPosition } from "../atoms";
import { useEffect } from "react";
import Button from "../component/Button";

function Thumnail() {
  const [isOpenThumnail, setIsOpenThumnail] = useRecoilState(openThumnail);

  return (
    <div
      className="thumnail MenuButtonPadding"
      style={{
        backgroundColor: isOpenThumnail ? "rgba(0,0,0,0.1)" : "transparent",
      }}
    >
      <Button
        direction={"thumnail"}
        onClick={() => setIsOpenThumnail((prev) => !prev)}
        tooltip={true}
        disabled={false}
      />
    </div>
  );
}

export default Thumnail;
