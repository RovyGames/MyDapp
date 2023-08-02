import { useEffect, useState, useCallback, useMemo } from "react";

import {
  MintModalText,
  MintModalWrapper,
  MintModalButton,
  MintModalButtonMinus,
  MintModalButtonPlus,
  MintModalButtonText,
  MintModalAmountSection,
  MintModalAmountInput,
} from "./MintModal.styled";
import { ethers } from "ethers";
import HappyPika from "../../artifacts/contracts/HappyPika.sol/HappyPika.json";
import Spinner from "react-spinner-material";
import { getProof } from "../../app/actions/merkle";
import { CONTRACT_ADDRESS } from "../../app/constants/contract-constants";

const MintModal = () => {
  const [provider] = useState(
    () => new ethers.providers.Web3Provider(window.ethereum)
  );

  const contract = useMemo(
    () =>
      new ethers.Contract(
        CONTRACT_ADDRESS,
        HappyPika.abi,
        provider.getSigner()
      ),
    [provider]
  );

  const [defaultAccount, setDefaultAccount] = useState(null);
  const [amount, setAmount] = useState(1);
  const [maxSupply, setMaxSupply] = useState(0);
  const [totalSupply, setTotalSupply] = useState(0);
  const [price, setPrice] = useState(0);
  const [isPublicSale, setIsPublicSale] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getMaxSupply = useCallback(async () => {
    const supply = await contract.getMaxSupply();
    setMaxSupply(parseInt(supply));
  }, [contract]);

  const getTotalSupply = useCallback(async () => {
    const supply = await contract.totalSupply();
    setTotalSupply(parseInt(supply));
  }, [contract]);

  const getPrice = useCallback(async () => {
    const price = await contract.getCost();
    setPrice(parseInt(price));
  }, [contract]);

  const getSaleStatus = useCallback(async () => {
    const status = await contract.isPublicSale();
    setIsPublicSale(status);
  }, [contract]);

  const getPauseStatus = useCallback(async () => {
    const status = await contract.paused();
    setIsPaused(status);
  }, [contract]);

  useEffect(() => {
    if (localStorage.getItem("address") == null) {
      setDefaultAccount(null);
    } else {
      setDefaultAccount(JSON.parse(localStorage.getItem("address")));
    }
  }, []);

  const handleMint = async () => {
    try {
      const adr = await provider.getSigner().getAddress();

      const proof = getProof(adr);

      const result = await contract.safeMint(adr, amount, proof, {
        value: (amount * price).toString(),
      });

      const receipt = await result.wait();
      console.log(receipt);

      await getMaxSupply();
      await getTotalSupply();
      await getPrice();
    } catch (err) {
      console.error(err);
      setError(err.reason);
    }
  };

  const handleWalletConnection = () => {
    provider.send("eth_requestAccounts", []).then(async () => {
      await accountChangedHandler(provider.getSigner());
    });
  };

  const accountChangedHandler = async (newAccount) => {
    const address = await newAccount.getAddress();
    setDefaultAccount(address);
    localStorage.setItem("address", JSON.stringify(address));
  };

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      try {
        await getMaxSupply();
        await getTotalSupply();
        await getPrice();
        await getSaleStatus();
        await getPauseStatus();
      } catch (err) {
        setIsLoading(false);
        setError(err.reason);
      } finally {
        setIsLoading(false);
      }
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultAccount]);

  if (isLoading) {
    return (
      <MintModalWrapper>
        <Spinner color={"#e6b9ff"} />
      </MintModalWrapper>
    );
  }
  if (!defaultAccount) {
    return (
      <MintModalWrapper>
        <MintModalButton>
          <MintModalButtonText onClick={handleWalletConnection}>
            Connect
          </MintModalButtonText>
        </MintModalButton>
      </MintModalWrapper>
    );
  } else {
    if (!isPaused) {
      return (
        <MintModalWrapper>
          <MintModalText>
            {error ? error : isPublicSale ? "Mint live!" : "Premint live!"}
          </MintModalText>
          <MintModalText>
            {totalSupply}/{maxSupply}
          </MintModalText>
          <MintModalText>
            {ethers.utils.formatEther(price.toString()) * amount} ETH
          </MintModalText>
          <MintModalAmountSection>
            <MintModalButtonMinus
              onClick={() => amount > 1 && setAmount(amount - 1)}
            >
              <MintModalButtonText>-</MintModalButtonText>
            </MintModalButtonMinus>
            <MintModalAmountInput>
              <MintModalButtonText>{amount}</MintModalButtonText>
            </MintModalAmountInput>
            <MintModalButtonPlus onClick={() => setAmount(amount + 1)}>
              <MintModalButtonText>+</MintModalButtonText>
            </MintModalButtonPlus>
          </MintModalAmountSection>
          <MintModalButton>
            <MintModalButtonText onClick={handleMint}>Mint</MintModalButtonText>
          </MintModalButton>
        </MintModalWrapper>
      );
    } else {
      return (
        <MintModalWrapper>
          <MintModalText>Sale closed!</MintModalText>
        </MintModalWrapper>
      );
    }
  }
};

export default MintModal;
