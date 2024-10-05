import { useState } from "react";
interface Columns {
  label: string;
  accessor: string;
}

interface TableHeadProps {
  columns: Columns[];
}

const TableHead: React.FC<TableHeadProps> = ({ columns }): JSX.Element => {
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");

  const handleSortingChange = (accessor: string) => {
    console.log(accessor);
  };
  return (
    <thead>
      <tr>
        {columns.map(({ label, accessor }: Columns) => {
          return (
            <th key={accessor} onClick={() => handleSortingChange(accessor)}>
              {label}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};
export default TableHead;
