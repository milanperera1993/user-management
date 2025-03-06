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
  Row,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { IconButton, Menu, MenuItem, Popover, Stack, Typography } from "@mui/material";
import {
  ArrowDownward as ArrowDownwardIcon,
  ArrowUpward as ArrowUpwardIcon,
  FilterList as FilterListIcon,
  MoreVert as MoreVertIcon
} from "@mui/icons-material";

import mockData from "../data/mock_data.json"; // Your mock data path

const data = mockData;

type RowData = {
  id: string;
  name: string;
  age: string;
  city: string;
  actions?: string; 
};

const DataGrid = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filtering, setFiltering] = useState<ColumnFiltersState>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentColumn, setCurrentColumn] = useState<Header<
   RowData,
    unknown
  > | null>(null);

  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<Row<RowData> | null>(null);

  const columns = useMemo(
    () => [
      { header: "ID", accessorKey: "id" },
      { header: "Name", accessorKey: "name" },
      { header: "Age", accessorKey: "age" },
      { header: "City", accessorKey: "city" },
      {
        header: "Actions",
        accessorKey: "actions",
        enableSorting: false,
        enableFiltering: false,
        cell: ({ row }: { row: Row<RowData> }) => (
          <IconButton
            onClick={(event) => {
              setMenuAnchorEl(event.currentTarget);
              setSelectedRow(row);
            }}
          >
            <MoreVertIcon />
          </IconButton>
        ),
      },
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
      RowData,
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
      setFiltering([])
      if (order === "unsort") {
        setSorting([]);
      } else {
        setSorting([{ id: currentColumn.id, desc: order === "desc" }]);
      }
      handleClose()
    }
  };
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setSelectedRow(null);
  };

  const handleEdit = () => {
    // Handle edit action
    console.log("Edit row:", selectedRow?.original.id);
    handleMenuClose();
  };

  const handleDelete = () => {
    // Handle delete action
    console.log("Delete row:", selectedRow?.original.id);
    handleMenuClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Box
      sx={{
        width: "100%",
        height: "750px",
        overflow: "auto",
      }}
      ref={parentRef}
    >
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
                      column.column.toggleSorting(
                        column.column.getIsSorted() === "asc"
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
                        <div style={{ width: "24px", textAlign: "right" }}>
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
                    )}
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
                display: "flex",
              }}
            >
              {row.getVisibleCells().map((cell) => (
                <div
                  key={cell.id}
                  style={{
                    display: "inline-block",
                    padding: "5px",
                    minWidth: "100px",
                    width: "25%",
                    flexGrow: 1,
                    backgroundColor:
                      virtualRow.index % 2 === 0
                        ? "rgba(0, 0, 0, 0.04)"
                        : "rgba(255, 255, 255, 0.04)",
                    minHeight: "50px",
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
                  Reset
                </Typography>
              </Stack>
            </>
          )}
        </Box>
      </Popover>
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </Box>
  );
};

export default DataGrid;
