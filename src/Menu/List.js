import Button from "../component/Button";

function List() {
  const goToContact = () => {
    window.open("https://www.mempro.co.kr/contact", "_blank");
  };
  return (
    <div className="list MenuButtonPadding">
      <Button
        direction={"list"}
        onClick={goToContact}
        tooltip={true}
        disabled={false}
      />
    </div>
  );
}

export default List;
