import styled from "styled-components";

export const MintPageContainer = styled.main`
  position: relative;

  min-height: 100vh;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background: linear-gradient(180deg, #160e2a 0%, #1f1539 100%);
  backdrop-filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

  overflow: hidden;
`;

export const MintPageGradient = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(-30%, -40%);
  width: 100rem;
`;

export const MintModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  min-width: clamp(300px, 50%, 600px);
  min-height: clamp(300px, 50%, 600px);

  background-color: #00000050;
  backdrop-filter: blur(25px);

  border-radius: 10px;
  box-shadow: 0 0 10px #000000AA;

  padding: 2rem 1.5rem;
`;

export const MintModalTitle = styled.h1`
  font-family: Jura;
  font-size: 3rem;
  font-weight: 700;
  text-align: center;

  background: linear-gradient(180deg, #e6b9ff 0%, #9e89ff 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 4px 4px 5px rgba(0,0,0,0.25);

  margin-bottom: 1rem;
`;
