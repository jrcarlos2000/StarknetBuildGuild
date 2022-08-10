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
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{repo}</ReactMarkdown>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding-bottom: 3rem;
`;
