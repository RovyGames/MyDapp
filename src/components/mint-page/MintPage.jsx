import {
  MintPageContainer,
  MintModalTitle,
  MintModalContainer,
  MintPageGradient,
} from "./MintPage.styled";
import MintModal from "../mint-modal";
import bgGradient from "./assets/bg-gradient.svg";

const MintPage = () => {
  return (
    <MintPageContainer>
      <MintPageGradient src={bgGradient} alt="bg-gradient" />
      <MintModalContainer>
        <MintModalTitle>Mint your NFT!</MintModalTitle>
        <MintModal />
      </MintModalContainer>
    </MintPageContainer>
  );
};

export default MintPage;
