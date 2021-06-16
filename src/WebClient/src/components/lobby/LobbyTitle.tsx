import { useHistory } from "react-router-dom";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import ThemeManager from "../../Themes";
import LobbyState from "../../state/LobbyState";
import Logo from "../nav/Logo";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 1em;
`;

const LogoContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
`;

const Leave = styled.a`
  color: ${ThemeManager.theme?.text2};
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const LobbyKey = observer(() => {
  return <div>Join Code: {LobbyState.lobby!.key}</div>;
});

const LobbyTitle = observer(() => {
  let history = useHistory();

  return (
    <Layout>
      <ButtonContainer>
        <LobbyKey />
        <Leave
          onClick={() => {
            LobbyState.leaveLobby();
            history.push("/");
          }}
        >
          Leave Lobby
        </Leave>
      </ButtonContainer>
    </Layout>
  );
});

export default LobbyTitle;