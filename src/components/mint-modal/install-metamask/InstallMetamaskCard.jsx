import {
    MintModalText,
    MintModalWrapper,
    MintModalButton,
    MintModalButtonText,
  } from "../MintModal.styled";

const InstallMetamaskCard = () => {
  const handleInstallMetamask = () => {
    window.open("https://metamask.io/download", "_blank");
  };

  return (
    <MintModalWrapper>
      <MintModalText>Install Metamask</MintModalText>
      <MintModalButton onClick={handleInstallMetamask}>
        <MintModalButtonText>Install</MintModalButtonText>
      </MintModalButton>
    </MintModalWrapper>
  );
};

export default InstallMetamaskCard;
