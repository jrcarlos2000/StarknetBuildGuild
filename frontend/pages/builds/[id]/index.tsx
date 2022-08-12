import { useRouter } from "next/router";
import styled, { css } from "styled-components";
import BuildProject from "~/components/BuildProject";
import ReadMe from "~/components/ReadMe";
import { useEffect, useState } from "react";
import { BsFillCaretRightFill, BsFillCaretDownFill } from "react-icons/bs";
import { useStarknet, useStarknetCall } from "@starknet-react/core";
import { useCoreContract } from "~/hooks/Core";
import {
  fetchBuildInfo,
  parseReadMeFromRepo,
  fetchAllPoolInfo,
} from "src/utils/core";
import { isAddressEqual } from "src/utils/address";

const Build = () => {
  const [isShow, setIsShow] = useState(false);
  const [build, setBuild] = useState<any>();
  const [pools, setPools] = useState<any>([]);
  const router = useRouter();
  const { id } = router.query;
  const { contract: cCore } = useCoreContract();
  const { account } = useStarknet();
  const { data: BuildDataResult } = useStarknetCall({
    contract: cCore,
    method: "get_builds_by_id",
    args: [id],
    options: { watch: false },
  });
  const { data: allPoolsResult } = useStarknetCall({
    contract: cCore,
    method: "get_all_pools",
    args: [],
    options: { watch: true },
  });

  useEffect(() => {
    async function asyncFn() {
      if (BuildDataResult) {
        setBuild(await fetchBuildInfo(BuildDataResult, cCore, id));
      }
    }
    asyncFn();
  }, [BuildDataResult]);

  useEffect(() => {
    async function asyncFn() {
      if (allPoolsResult) {
        setPools(await fetchAllPoolInfo(allPoolsResult));
      }
    }
    asyncFn();
  }, [allPoolsResult]);

  return (
    <Wrapper isShow={isShow}>
      {build ? (
        <BuildProject
          filteredProject={build}
          pools={pools}
          isOwner={
            account && build.owner && isAddressEqual(build.owner, account)
          }
        />
      ) : (
        <></>
      )}
      <ToggleContainer>
        {isShow ? (
          <Toggle>
            <BsFillCaretDownFill
              onClick={() => {
                setIsShow(false);
              }}
            />
          </Toggle>
        ) : (
          <Toggle>
            <BsFillCaretRightFill
              onClick={() => {
                setIsShow(true);
              }}
            />
          </Toggle>
        )}
        <p>ReadMe.md</p>
      </ToggleContainer>
      {isShow && build && <ReadMe url={parseReadMeFromRepo(build.repoUrl)} />}
    </Wrapper>
  );
};

export default Build;

const height = css<{ isShow: boolean }>`
  ${(props) =>
    props.isShow === true &&
    css`
      height: 100%;
    `}
  ${(props) =>
    props.isShow === false &&
    css`
      height: 100vh;
    `}
`;
const Wrapper = styled.div`
  width: 50vw;
  ${height};
  color: #fff;
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Toggle = styled.div`
  & > svg {
    font-size: 1.3rem;
    margin-right: 0.7rem;
    padding-top: 0.3rem;
  }
  &:hover {
    cursor: pointer;
  }
`;
