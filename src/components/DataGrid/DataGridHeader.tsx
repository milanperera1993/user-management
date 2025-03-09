import { flexRender, Header, Table } from "@tanstack/react-table";
import { User } from "../../redux/features/users/usersApi";

import {
  ArrowDownward as ArrowDownwardIcon,
  ArrowUpward as ArrowUpwardIcon,
  FilterList as FilterListIcon,
} from "@mui/icons-material";
import { RowData } from "./DataGrid";


interface DataGridProps {
  table: Table<User>;
  handleFilterIconClick: (
    event: React.MouseEvent<SVGElement>,
    column: Header<RowData, unknown>
  ) => void;
}

const DataGridHeader = (props: DataGridProps) => {
  const { table, handleFilterIconClick } = props;
  return (
    <>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          tableLayout: "fixed",
          minWidth: "500px",
        }}
      >
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <th
                  key={column.id}
                  style={{
                    padding: "10px",
                    textAlign: "left",
                    cursor: column.column.getCanSort() ? "pointer" : "default",
                    minWidth: "100px",
                  }}
                  onClick={() => {
                    if (column.column.getCanSort()) {
                      const isSorted = column.column.getIsSorted();
                      column.column.toggleSorting(
                        isSorted === "asc"
                          ? true
                          : isSorted === "desc"
                          ? false
                          : true
                      );
                    }
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span>
                      {flexRender(
                        column.column.columnDef.header,
                        column.getContext()
                      )}
                    </span>
                    {column.column.id !== "actions" && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          minWidth: "48px",
                          justifyContent: "flex-end",
                        }}
                      >
                        <div style={{ width: "24px", textAlign: "right", marginRight: "5px" }}>
                          {column.column.getIsSorted() &&
                            (column.column.getIsSorted() === "desc" ? (
                              <ArrowDownwardIcon
                                fontSize="small"
                                sx={{ ml: 1 }}
                              />
                            ) : (
                              <ArrowUpwardIcon
                                fontSize="small"
                                sx={{ ml: 1 }}
                              />
                            ))}
                        </div>
                        <div style={{ width: "24px", textAlign: "right" }}>
                          {column.column.getCanFilter() && (
                              <FilterListIcon  onClick={(e) => handleFilterIconClick(e, column)} fontSize="small" />
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
      </table>
    </>
  );
};
export default DataGridHeader;
