function Logo() {
  const goToWebsite = () => {
    window.open("https://www.mempro.co.kr/", "_blank");
  };
  return (
    <div
      className="logo"
      style={{
        width: "30%",
        minWidth: "200px",
        paddingLeft: "50px",
      }}
    >
      <img
        src="https://mempro.co.kr:85/image/logo/logo.svg"
        height={30}
        onClick={goToWebsite}
        style={{ cursor: "pointer" }}
      />
    </div>
  );
}

export default Logo;
