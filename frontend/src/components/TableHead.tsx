import { useState } from "react";
interface Columns {
  label: string;
  accessor: string;
  sortable: boolean;
}

interface TableHeadProps {
  columns: Columns[];
  handleSorting: any;
}

const TableHead: React.FC<TableHeadProps> = ({
  columns,
  handleSorting,
}): JSX.Element => {
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");

  const handleSortingChange = (accessor: string) => {
    // console.log(accessor);
    const sortOrder =
      accessor === sortField && order === "asc" ? "desc" : "asc";
    setSortField(accessor);
    setOrder(sortOrder);
    handleSorting(accessor, sortOrder);
  };
  return (
    <thead>
      <tr>
        {columns.map(({ label, accessor, sortable }: Columns) => {
          const cl = sortable
            ? sortField === accessor && order === "asc"
              ? "up"
              : sortField === accessor && order === "desc"
              ? "down"
              : "default"
            : "";
          const backgroundStyles = {
            backgroundImage: `url('/${
              cl === "up"
                ? "arrow-up.png"
                : cl === "down"
                ? "down_arrow.png"
                : "default.png"
            }')`,
          };

          return (
            <th
              key={accessor}
              className={`cursor-pointer border-2 border-black bg-slate-100 bg-right bg-no-repeat px-4 py-2`}
              style={backgroundStyles}
              onClick={
                sortable ? () => handleSortingChange(accessor) : undefined
              }>
              {label}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};
export default TableHead;
