import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  SortingState,
  ColumnFiltersState,
  Header,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { IconButton, Popover, Stack, Typography } from "@mui/material";
import {
  ArrowDownward as ArrowDownwardIcon,
  ArrowUpward as ArrowUpwardIcon,
  FilterList as FilterListIcon,
} from "@mui/icons-material";

import mockData from "../data/mock_data.json"; // Your mock data path

const data = mockData;

const DataGrid = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filtering, setFiltering] = useState<ColumnFiltersState>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentColumn, setCurrentColumn] = useState<Header<
    {
      id: string;
      name: string;
      age: string;
      city: string;
    },
    unknown
  > | null>(null);

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

  const parentRef = React.useRef<HTMLDivElement>(null);
  const rowVirtualizer = useVirtualizer({
    count: table.getRowModel().rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
  });

  const handleFilterIconClick = (
    event: React.MouseEvent<HTMLElement>,
    column: Header<
      {
        id: string;
        name: string;
        age: string;
        city: string;
      },
      unknown
    >
  ) => {
    event.stopPropagation(); // Prevent the sort function from triggering
    setAnchorEl(event.currentTarget);
    setCurrentColumn(column);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setCurrentColumn(null);
  };

  const handleSort = (order: string) => {
    if (currentColumn) {
      if (order === "unsort") {
        setSorting([]);
        handleClose();
      } else {
        setSorting([{ id: currentColumn.id, desc: order === "desc" }]);
        handleClose();
      }
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Box
      sx={{
        width: "100%",
        height: "750px",
        overflow: "auto",
        p: 2,
      }}
      ref={parentRef}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          tableLayout: "fixed",
          minWidth: "400px",
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
                    cursor: "pointer",
                    minWidth: "100px", // Set a min-width for all columns
                  }}
                  onClick={() =>
                    column.column.toggleSorting(
                      column.column.getIsSorted() === "asc"
                    )
                  }
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
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        minWidth: "48px",
                        justifyContent: "flex-end",
                      }}
                    >
                      <div style={{ width: "24px", textAlign: "right" }}>
                        {column.column.getIsSorted() &&
                          (column.column.getIsSorted() === "desc" ? (
                            <ArrowDownwardIcon
                              fontSize="small"
                              sx={{ ml: 1 }}
                            />
                          ) : (
                            <ArrowUpwardIcon fontSize="small" sx={{ ml: 1 }} />
                          ))}
                      </div>
                      <div style={{ width: "24px", textAlign: "right" }}>
                        {column.column.getCanFilter() && (
                          <IconButton
                            onClick={(e) => handleFilterIconClick(e, column)}
                            size="small"
                            sx={{ ml: 1 }}
                          >
                            <FilterListIcon fontSize="small" />
                          </IconButton>
                        )}
                      </div>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
      </table>

      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          position: "relative",
          width: "100%",
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const row = table.getRowModel().rows[virtualRow.index];
          return (
            <div
              key={row.id}
              style={{
                position: "absolute",
                top: `${virtualRow.start}px`,
                width: "100%",
                minWidth: "100px",
                display: "flex",
                backgroundColor:
                  virtualRow.index % 2 === 0
                    ? "rgba(0, 0, 0, 0.04)"
                    : "rgba(255, 255, 255, 0.04)",
              }}
            >
              {row.getVisibleCells().map((cell) => (
                <div
                  key={cell.id}
                  style={{
                    display: "inline-block",
                    padding: "10px",
                    minWidth: "100px",
                    width: "25%",
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* TODO: style pop-over */}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box sx={{ p: 2 }}>
          {currentColumn && (
            <>
              <TextField
                label="Filter"
                onClick={(e) => e.stopPropagation()}
                onChange={(e) =>
                  currentColumn.column.setFilterValue(
                    e.target.value || undefined
                  )
                }
                variant="standard"
                size="small"
                fullWidth
                sx={{ marginBottom: 2 }}
              />
              <Stack spacing={1} direction="column">
                <Typography
                  onClick={() => handleSort("asc")}
                  sx={{ cursor: "pointer" }}
                >
                  Sort Asc
                </Typography>
                <Typography
                  onClick={() => handleSort("desc")}
                  sx={{ cursor: "pointer" }}
                >
                  Sort Desc
                </Typography>
                <Typography
                  onClick={() => handleSort("unsort")}
                  sx={{ cursor: "pointer" }}
                >
                  Unsort
                </Typography>
              </Stack>
            </>
          )}
        </Box>
      </Popover>
    </Box>
  );
};

export default DataGrid;
