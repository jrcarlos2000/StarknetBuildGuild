import styled from "styled-components";

export const OutlineButton = styled.button`
  font-weight: 500;
  border: 1px solid #e2e8f0;
  background-color: #ffffff;
  border-radius: 7px;
  text-align: center;
  padding: 0.5rem;
  transition: 0.3s;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
    background-color: #edf0f2;
  }
`;
