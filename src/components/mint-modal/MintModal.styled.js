import { styled } from "styled-components";

export const MintModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

export const MintModalText = styled.p`
  font-family: Jura;
  font-size: 1.5rem;
  font-weight: 500;
  text-align: center;
`;

export const MintModalButton = styled.button`
  position: relative;

  background: linear-gradient(180deg, #e6b9ff 0%, #9e89ff 100%);

  border: none;
  outline: none;
  cursor: pointer;

  padding: 0.5rem 1rem;
  margin-top: 1.5rem;

  border-radius: 10px;
  box-shadow: 0 0 10px #000000aa;

  transition: all 0.2s ease-in-out;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    background: linear-gradient(180deg, #9e89ff 0%, #e6b9ff 100%);
    opacity: 0;
    border-radius: 10px;

    transition: opacity 0.2s ease-in-out;
  }

  &:hover::before {
    opacity: 1;
  }

  &:hover {
    filter: grayscale(40%);
    opacity: 0.8;
  }

  &:active {
    filter: grayscale(100%);
    opacity: 1;
  }
`;

export const MintModalButtonText = styled.p`
  position: relative;

  font-family: Jura;
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  text-transform: uppercase;

  background: linear-gradient(180deg, #160e2a 0%, #1f1539 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  z-index: 1;
`;

export const MintModalAmountSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  border-radius: 10px;

  margin-top: 1rem;
`;

export const MintModalAmountInput = styled.div`
  min-width: 5rem;

  background: #ffffff;

  border: none;
  outline: none;

  padding: 0.5rem 1rem;

  z-index: 1;
`;

export const MintModalButtonPlus = styled.button`
  height: 100%;
  position: relative;

  background: linear-gradient(180deg, #e6b9ff 0%, #9e89ff 100%);

  border: none;
  outline: none;
  cursor: pointer;

  padding: 0.5rem 1rem;

  border-radius: 0 10px 10px 0;
  box-shadow: 0 0 10px #000000aa;

  transition: all 0.2s ease-in-out;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    background: linear-gradient(180deg, #9e89ff 0%, #e6b9ff 100%);
    opacity: 0;
    border-radius: 0 10px 10px 0;

    transition: opacity 0.2s ease-in-out;
  }

  &:hover::before {
    opacity: 1;
  }

  &:hover {
    filter: grayscale(40%);
    opacity: 0.8;
  }

  &:active {
    filter: grayscale(100%);
    opacity: 1;
  }
`;

export const MintModalButtonMinus = styled.button`
  height: 100%;
  position: relative;

  background: linear-gradient(180deg, #e6b9ff 0%, #9e89ff 100%);

  border: none;
  outline: none;
  cursor: pointer;

  padding: 0.5rem 1rem;

  border-radius: 10px 0 0 10px;
  box-shadow: 0 0 10px #000000aa;

  transition: all 0.2s ease-in-out;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    background: linear-gradient(180deg, #9e89ff 0%, #e6b9ff 100%);
    opacity: 0;
    border-radius: 10px 0 0 10px;

    transition: opacity 0.2s ease-in-out;
  }

  &:hover::before {
    opacity: 1;
  }

  &:hover {
    filter: grayscale(40%);
    opacity: 0.8;
  }

  &:active {
    filter: grayscale(100%);
    opacity: 1;
  }
`;