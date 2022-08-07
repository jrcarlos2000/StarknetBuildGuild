import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";
import { ChangeEventHandler } from "react";

export const SearchBar = ({
  placeholder,
  width,
  onChange
}: {
  placeholder: string;
  width: string;
  onChange: ChangeEventHandler<HTMLInputElement>
}) => {
  return (
    <SearchBarContainer width={width}>
      <SearchBarInput placeholder={placeholder} onChange={onChange}/>
      <SearchBarIcon>
        <AiOutlineSearch size={26} color="#cccccc" />
      </SearchBarIcon>
    </SearchBarContainer>
  );
};

const SearchBarContainer = styled.div<{ width: string }>`
  display: flex;
  position: relative;
  width: ${(props) => props.width};
  align-items: center;
`;

const SearchBarInput = styled.input`
  font-size: 1rem;
  width: 100%;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  padding-top: 0.7rem;
  padding-bottom: 0.7rem;
  border-radius: 0.5rem;
  border: 1px solid #cccccc;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  ::placeholder {
    color: #9a9b9c;
  }
`;

const SearchBarIcon = styled.div`
  display: flex;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  align-items: center;
  padding-right: 0.75rem;
}
`;
