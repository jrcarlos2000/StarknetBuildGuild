import styled from "styled-components";
import { BigNumber, utils } from "ethers";
import { useState } from "react";
import { CustomModal } from "./commons/modal";
import { PrimaryBlueButton } from "./commons/PrimaryBlueButton";
import { FormInput } from "./commons/FormInput";
import { useCoreContract } from "~/hooks/Core";
import { useTokenContract } from "~/hooks/ERC";
import { useStarknet, useStarknetInvoke } from "@starknet-react/core";
import { bnToUint256,uint256ToBN } from "starknet/dist/utils/uint256";
import { toBN } from "starknet/utils/number";

export default function DonateModal({
  isOpen,
  onClose,
  id
}: {
  isOpen: boolean;
  onClose: () => void;
  id : any
}) {
  const {account, connectors} = useStarknet();
  const [value, setValue] = useState<any>();
  const [buttonMsg, setButtonMsg] = useState<any>('Submit')
  const [parsedValue, setParsedValue] = useState<any>();
  const {contract : cCore} = useCoreContract();
  const {contract : cToken} = useTokenContract();
  const {invoke : callVote} = useStarknetInvoke({
    contract : cCore,
    method : 'vote'
  })
  const {invoke : callApprove} = useStarknetInvoke({
    contract : cToken,
    method : 'approve'
  })
  const onChangeValue = (e: any) => {
    if(e.target.value.toString()!="")setParsedValue(utils.parseEther(e.target.value.toString()));
  };
  const onDonateSubmit = async () =>{
    setButtonMsg('Loading...');
    const Account = await connectors[0].account();
<<<<<<< HEAD
    const balance = await cToken?.balanceOf(account);
=======
    const balance = await cToken!.balanceOf(account);
>>>>>>> 9f9950cf34aa5cb2ac9fb245d664654cce06cd2c
    const finalBalance = uint256ToBN(balance[0]).toString();

    await Account.execute([
      {
        contractAddress: cToken ? cToken.address : '',
        entrypoint: 'approve',
        calldata: [cCore?.address, parsedValue.toString(), '0'],
      },
      {
        contractAddress: cCore ? cCore.address : '',
        entrypoint: 'vote',
        calldata: [id, parsedValue.toString(),'0'],
      }
    ])

    // await callApprove({
    //   args : [toBN(cCore.address), bnToUint256(parsedValue.toString())],
    //   metadata: { method: "approve", message: "approve core" },
    // })
    setButtonMsg('Submit');
  }
  return (
    <CustomModal title="Donate" isOpen={isOpen} onClose={onClose}>
      <AmountFormInput
        placeholder="ETH"
        value={value}
        onChange={onChangeValue}
      />
      <PrimaryBlueButton onClick={onDonateSubmit}>{buttonMsg}</PrimaryBlueButton>
    </CustomModal>
  );
}

const AmountFormInput = styled(FormInput)`
  margin-bottom: 0.5rem;
`;
