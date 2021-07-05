import { observer } from "mobx-react-lite";
import styled from "styled-components";
import PopUpState from "../../state/PopUpState";

const FinishWrapper = styled.div`
  display: flex;
`;

const FinishControls = observer(() => {
  return (
    <FinishWrapper>
      <button
        onClick={() => {
          PopUpState.closeFinish();
        }}
      >
        close
      </button>
    </FinishWrapper>
  );
});

export default FinishControls;
