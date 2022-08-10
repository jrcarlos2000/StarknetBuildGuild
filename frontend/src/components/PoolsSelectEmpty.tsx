import styled from "styled-components";

export const PoolsSelectEmpty = () => 
<EmptyContainer>
    There&apos;s not active pools currently.
</EmptyContainer>;

const EmptyContainer = styled.div`
  padding: 1rem;
  width: 100%;
  height: 100%;
  vertical-align: middle;
  text-align: center;
  border: 1px solid #e5e6e6;
  border-radius: 0.75rem;
`;
