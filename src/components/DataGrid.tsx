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
import {
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import {
  ArrowDownward as ArrowDownwardIcon,
  ArrowUpward as ArrowUpwardIcon,
  FilterList as FilterListIcon,
  MoreVert as MoreVertIcon,
  AddCircle,
} from "@mui/icons-material";
import { User } from "../redux/features/users/usersApi";
import UserDialog from "./UserDialog";

interface DataGridProps {
  isLoading: boolean;
  users: User[];
  isError: boolean;
}

export type RowData = User & {
  actions?: string;
};

const DataGrid = (props: DataGridProps) => {
  const { isLoading, users, isError } = props;
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filtering, setFiltering] = useState<ColumnFiltersState>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentColumn, setCurrentColumn] = useState<Header<
    RowData,
    unknown
  > | null>(null);

  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<Row<RowData> | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const mockId = (users.length + 1).toString();

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
    data: users,
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
    column: Header<RowData, unknown>
  ) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setCurrentColumn(column);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setCurrentColumn(null);
  };

  const handleSort = (order: string) => {
    if (currentColumn) {
      setFiltering([]);
      if (order === "unsort") {
        setSorting([]);
      } else {
        setSorting([{ id: currentColumn.id, desc: order === "desc" }]);
      }
      handleClose();
    }
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleEdit = () => {
    setOpenDialog(true);
    handleMenuClose();
  };

  const handleDelete = () => {
    handleMenuClose();
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setSelectedRow(null);
    setOpenDialog(false);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Box
      sx={{
        width: "100%",
        height: "700px",
        overflow: "auto",
      }}
      ref={parentRef}
    >
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Typography variant="subtitle1">Users</Typography>
        <AddCircle
          sx={{ cursor: "pointer", marginLeft: "5px" }}
          onClick={handleDialogOpen}
        />
      </Box>
      {isLoading && (
        <Stack alignItems="center" justifyContent="center" height="100%">
          <CircularProgress />
          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            Loading...
          </Typography>
        </Stack>
      )}
      {isError && !isLoading && (
        <Typography variant="subtitle1" sx={{ mt: 2 }}>
          Error while fetching data.
        </Typography>
      )}
      {!isLoading && !isError && users && users.length > 0 && (
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
                        cursor: column.column.getCanSort()
                          ? "pointer"
                          : "default",
                        minWidth: "100px",
                      }}
                      onClick={() => {
                        if (column.column.getCanSort()) {
                          const isSorted = column.column.getIsSorted();
                          column.column.toggleSorting(
                            isSorted === "asc" ? true : isSorted === "desc" ? false : true
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
                                  onClick={(e) =>
                                    handleFilterIconClick(e, column)
                                  }
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>

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
        </>
      )}
      <UserDialog
        mockId={mockId}
        selectedRow={selectedRow}
        openDialog={openDialog}
        handleDialogClose={handleDialogClose}
      />
    </Box>
  );
};

export default DataGrid;