import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { isFull } from "../atoms";
import Button from "../component/Button";

function Full() {
  const [isFullScreen, setIsFullScreen] = useRecoilState(isFull);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const goToFullScreen = (direction) => {
    if (direction === "Full") document.documentElement.requestFullscreen();
    else document.exitFullscreen();
    setIsFullScreen((prev) => !prev);
  };

  return (
    <div
      className="Full MenuButtonPadding"
      style={{
        backgroundColor: isFullScreen ? "rgba(0,0,0,0.1)" : "transparent",
      }}
    >
      {isFullScreen ? (
        <Button
          direction={"window"}
          onClick={() => goToFullScreen(isFullScreen ? "Window" : "Full")}
          tooltip={true}
          disabled={false}
        />
      ) : (
        <Button
          direction={"full"}
          onClick={() => goToFullScreen(isFullScreen ? "Window" : "Full")}
          tooltip={true}
          disabled={false}
        />
      )}
    </div>
  );
}

export default Full;
