import { useStarknetInvoke } from "@starknet-react/core";
import { ComponentProps, useEffect, useState } from "react";
import styled from "styled-components";
import { useCoreContract } from "~/hooks/Core";
import { FormSelect, FormSelectItem } from "./commons/FormSelect";
import { CustomModal } from "./commons/modal";
import { PrimaryBlueButton } from "./commons/PrimaryBlueButton";
import { FormSelectEmpty } from "./FormSelectEmpty";

export const AddProjectToPoolModal = ({
  pools,
  isOpen,
  onClose,
  id,
}: Omit<ComponentProps<typeof CustomModal>, "title"> & { id: string, pools: any[] }) => {
  const [buttonMsg, setButtonMsg] = useState<any>("Submit");
  const { contract: cCore } = useCoreContract();
  const [selectedPool, setSelectedPool] = useState<any>("");
  const { invoke: callAddToPool } = useStarknetInvoke({
    contract: cCore,
    method: "add_buidl_to_pool",
  });
  const onClickAddButton = async () => {
    setButtonMsg("loading...");
    console.log([id, selectedPool]);
    await callAddToPool({
      args: [id, selectedPool],
      metadata: {
        method: "add_buidl_to_pool",
        message: "add this build to pool",
      },
    });
    setButtonMsg("Submit");
    onClose;
  };
  useEffect(()=>{
    console.log(pools, "enetering here");
   if(pools.length > 0) setSelectedPool("1");
  },[pools])
  const handleChange = (e: any) => {
    setSelectedPool(e.target.value);
  };
  return (
    <CustomModal title="Add Project to Pool" isOpen={isOpen} onClose={onClose}>
      <FormWrapper>
        {pools && pools.length > 0 ? (
          <FormSelect onChange={handleChange}>
            {pools?.map((pool) => (
              <FormSelectItem key={pool.id} value={pool.id}>
                {pool.name}
              </FormSelectItem>
            ))}
          </FormSelect>
        ) : (
          <FormSelectEmpty />
        )}
      </FormWrapper>
      <ButtonWrapper>
        <PrimaryBlueButton onClick={onClickAddButton}>
          {buttonMsg}
        </PrimaryBlueButton>
      </ButtonWrapper>
    </CustomModal>
  );
};

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;
