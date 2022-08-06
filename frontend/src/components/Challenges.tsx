import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";
import { capitalize } from "src/utils/capitalize";
import styled from "styled-components";

export type ChallengeStatus = "accepted" | "in-progress" | "rejected";

export type ChallengeData = {
  name: string;
  contract: string;
  demo: string;
  status: ChallengeStatus;
};

const columnHelper = createColumnHelper<ChallengeData>();

const tableCols = [
  columnHelper.accessor("name", {
    header: "NAME",
    cell: (info) => <strong><Link href={"/"}>{info.getValue()}</Link></strong>,
  }),
  columnHelper.accessor("contract", {
    header: "CONTRACT",
    cell: (info) => <Link href={"/"}>Code</Link>,
  }),
  columnHelper.accessor("demo", {
    header: "DEMO",
    cell: (info) => <Link href={"/"}>Demo</Link>,
  }),
  columnHelper.accessor("status", {
    header: "STATUS",
    cell: (info) => (
      <ChallengeStatusPill status={info.getValue()}>
        {capitalize(info.getValue())}
      </ChallengeStatusPill>
    ),
  }),
];

export default function Challenges({ data }: { data: ChallengeData[] }) {
  const table = useReactTable<ChallengeData>({
    columns: tableCols,
    data,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <Wrapper>
        <Title>Challenges</Title>
      <ChallengesTable>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <ChallengeRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </ChallengeRow>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <ChallengeRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </ChallengeRow>
          ))}
        </tbody>
      </ChallengesTable>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const Title = styled.h2`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.5rem;
  margin: 0;
`;

const ChallengeRow = styled.tr`
  border-bottom: 1px solid #EDF2F7;
  th, td {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  td {
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
  }
  th {
    color: #4A5568;
    font-size: 0.75rem;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
  }
`;

const ChallengesTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  text-align: left;
  padding-right: 1.5rem;
  padding-left: 1.5rem;
  padding-top: 1rem;
  padding-bottom: 1rem;

  a {
    text-decoration: none;
    color: #319795;
  }

  a:hover {
    text-decoration: underline;
    text-decoration-thickness: 2px;
  }
`;

const ChallengeStatusPill = styled.span<{ status: ChallengeStatus }>`
  border-radius: 24px;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  padding-right: 0.75rem;
  padding-left: 0.75rem;
  font-size: 12px;
  font-weight: 600;
  background: ${(props) =>
    props.status === "accepted"
      ? "#C6F6D5"
      : props.status === "rejected"
      ? "#F56565"
      : "#F6E05E"};
      color: ${(props) =>
        props.status === "accepted"
          ? "#22543D"
          : props.status === "rejected"
          ? "#822727"
          : "#9C4221"};
`;
