import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styled from "styled-components";
import { useEffect, useState } from "react";

export default function ReadMe({ url }: any) {
  const [repo, setRepo] = useState<any>();
  useEffect(() => {
    const getRepo = async () => {
      try {
        const repo = await fetch(url);
        setRepo(await repo.text());
      } catch (error) {
        console.log(error);
      }
    };
    getRepo();
  }, []);

  return (
    <Wrapper>
      <ReactMarkdown children={repo} remarkPlugins={[remarkGfm]} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 2rem 0 3rem 0;
`;
