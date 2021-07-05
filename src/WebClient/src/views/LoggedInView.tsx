import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import AuthState from "../state/AuthState";
import ThemeManager from "../Themes";
import LobbyFinder from "../components/lobbyfinder/LobbyFinder";
import { Switch, Route } from "react-router-dom";
import HowToPlay from "../components/howtoplay/HowToPlay";
import Nav from "../components/nav/Nav";
import styled from "styled-components";
import Settings from "../components/settings/Settings";
import LobbyState from "../state/LobbyState";
import ConnectionState from "../state/ConnectionState";
import TimerState from "../state/TimerState";

const Layout = styled.div`
  display: flex;
  flex: 1;
`;

const NavWrapper = styled.div`
  display: flex;
  position: fixed;
  width: 16em;
  max-width: 16em;
  height: 100vh;
  box-shadow: rgb(0 0 0 / 13%) 0px 3.2px 7.2px 0px,
    rgb(0 0 0 / 11%) 0px 0.6px 1.8px 0px;
  outline: transparent;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 4em;
  margin-left: 20em;
  margin-top: 1em;
  align-content: center;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
`;

const LoggedInView = observer(() => {
  ThemeManager.leftNotifications = false;
  useEffect(() => {
    AuthState.getUser();
    LobbyState.removeLocalLobby();
    ConnectionState.cleanConnection();
    TimerState.resetTimer();
  }, []);
  return (
    <Layout>
      <NavWrapper>
        <Nav />
      </NavWrapper>
      <ContentWrapper>
        <Content>
          <Switch>
            <Route path="/settings">
              <Settings />
            </Route>
            <Route path="/howtoplay">
              <HowToPlay />
            </Route>
            <Route path="/">
              <LobbyFinder />
            </Route>
          </Switch>
        </Content>
      </ContentWrapper>
    </Layout>
  );
});

export default LoggedInView;
