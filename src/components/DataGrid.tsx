import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  SortingState,
  ColumnFilter,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import mockData from "../data/mock_data.json"


const data = mockData

const VirtualizedTable = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filtering, setFiltering] = useState<ColumnFilter[]>([]);

  const columns = useMemo(
    () => [
      { header: "ID", accessorKey: "id" },
      { header: "Name", accessorKey: "name" },
      { header: "Age", accessorKey: "age" },
      { header: "City", accessorKey: "city" },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters: filtering,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setFiltering,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const parentRef = React.useRef(null);
  const rowVirtualizer = useVirtualizer({
    count: table.getRowModel().rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
  });

  return (
    <Box sx={{ width: "100%", height: "700px", overflow: "auto" }} ref={parentRef}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <th
                  key={column.id}
                  style={{ padding: "10px", textAlign: "left", cursor: "pointer" }}
                  onClick={() => column.column.toggleSorting(column.column.getIsSorted() === "asc")}
                >
                  {flexRender(column.column.columnDef.header, column.getContext())}
                  {column.column.getIsSorted() ? (column.column.getIsSorted() === "desc" ? " 🔽" : " 🔼") : ""}
                  <TextField
                    label={`Search ${column.column.columnDef.header}`}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => column.column.setFilterValue(e.target.value || undefined)}
                    sx={{ marginTop: 1, width: "100%" }}
                  />
                </th>
              ))}
            </tr>
          ))}
        </thead>
      </table>
      <div style={{ height: `${rowVirtualizer.getTotalSize()}px`, position: "relative", width: "100%" }}>
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const row = table.getRowModel().rows[virtualRow.index];
          return (
            <div
              key={row.id}
              style={{
                position: "absolute",
                top: `${virtualRow.start}px`,
                width: "100%",
                display: "flex",
              }}
            >
              {row.getVisibleCells().map((cell) => (
                <div key={cell.id} style={{ display: "inline-block", padding: "10px", width: "25%" }}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </Box>
  );
};

export default VirtualizedTable;