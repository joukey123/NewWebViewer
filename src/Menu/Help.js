import Button from "../component/Button";

function Help() {
  return (
    <div className="help MenuButtonPadding">
      <Button direction={"help"} tooltip={true} disabled={false} />
    </div>
  );
}

export default Help;
