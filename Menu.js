import styled from "styled-components";
import Zoom from "./Menu/Zoom";
import Logo from "./Menu/Logo";
import Full from "./Menu/Full";
import Contact from "./Menu/Contact";
import List from "./Menu/List";
import Help from "./Menu/Help";
import Thumnail from "./Menu/Thumnail";

const MenuBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
`;

const IconBox = styled.div`
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  min-width: 500px;
  max-width: 700px;
`;

function Menu() {
  return (
    <MenuBox>
      <Logo />
      <IconBox>
        <Zoom />
        <Full />
        <Thumnail />
        <Contact />
        <List />
        <Help />
      </IconBox>
      <div style={{ width: "30%" }}></div>
    </MenuBox>
  );
}

export default Menu;
