import { ComponentProps } from "react";
import styled from "styled-components";
import { FormSelect, FormSelectItem } from "./commons/FormSelect";
import { CustomModal } from "./commons/modal";
import { PrimaryBlueButton } from "./commons/PrimaryBlueButton";
import { PoolsSelectEmpty } from "./PoolsSelectEmpty";

export const AddProjectToPoolModal = ({
  pools,
  isOpen,
  onClose,
}: Omit<ComponentProps<typeof CustomModal>, "title"> & { pools: any[] }) => {
  return (
    <CustomModal title="Add Project to Pool" isOpen={isOpen} onClose={onClose}>
      <FormWrapper>
        {pools && pools.length > 0 ? (
          <FormSelect>
            {pools?.map((pool) => (
              <FormSelectItem key={pool.id} value={pool.id}>
                {pool.name}
              </FormSelectItem>
            ))}
          </FormSelect>
        ) : (
          <PoolsSelectEmpty />
        )}
      </FormWrapper>
      <ButtonWrapper>
        <PrimaryBlueButton>Submit</PrimaryBlueButton>
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
