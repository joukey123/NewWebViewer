import Button from "../component/Button";

function Contact() {
  const goToContact = () => {
    window.open("https://www.mempro.co.kr/contact", "_blank");
  };
  return (
    <div className="contact MenuButtonPadding">
      <Button
        direction={"contact"}
        onClick={goToContact}
        tooltip={true}
        disabled={false}
      />
    </div>
  );
}

export default Contact;
