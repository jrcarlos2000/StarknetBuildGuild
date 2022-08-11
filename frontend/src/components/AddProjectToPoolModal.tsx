import { useStarknetInvoke } from "@starknet-react/core";
import { ComponentProps, useState } from "react";
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
}: Omit<ComponentProps<typeof CustomModal>, "title"> & { pools: any[] }) => {
  const [selectedPoolId, setPoolId] = useState<any>("");
  const [buttonMsg, setButtonMsg] = useState<any>("Submit");
  const { contract: cCore } = useCoreContract();
  const [selectedPool, setSelectedPool] = useState<any>("");
  const { invoke: callAddToPool } = useStarknetInvoke({
    contract: cCore,
    method: "add_buidl_to_pool",
  });
  const onClickAddButton = async () => {
    setButtonMsg("loading...");
    await callAddToPool({
      args: [id, selectedPool],
      metadata: {
        method: "add_buidl_to_pool",
        message: "add this build to pool",
      },
    });
    setButtonMsg("done");
    onClose;
  };
  const handleChange = (e) => {
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
