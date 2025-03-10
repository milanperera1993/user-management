import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  SortingState,
  ColumnFiltersState,
  Header,
  Row,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import Box from "@mui/material/Box";
import {
  AlertColor,
  AlertPropsColorOverrides,
  Button,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { MoreVert as MoreVertIcon, AddCircle } from "@mui/icons-material";
import { User } from "../../redux/features/users/usersApi";
import UserDialog from "../UserDialog";
import ConfirmDialog from "../ConfirmDialog";
import { getMockId } from "../../utils/common";
import SnackBar from "../SnackBar";
import { OverridableStringUnion } from "@mui/types";
import DataGridHeader from "../DataGrid/DataGridHeader";
import DataGridRow from "../DataGrid/DataGridRow";
import FilterPopover from "./FilterPopover";

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
  const [anchorEl, setAnchorEl] = useState<null | SVGElement>(null);
  const [currentColumn, setCurrentColumn] = useState<Header<
    RowData,
    unknown
  > | null>(null);

  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<Row<RowData> | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [snackBar, setSnackBar] = useState<{
    open: boolean;
    message: string;
    severity: OverridableStringUnion<AlertColor, AlertPropsColorOverrides>;
  }>({ open: false, message: "", severity: "info" });

  const mockId = !isLoading ? getMockId([...users].reverse()[0].id) : "";

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
    event: React.MouseEvent<SVGElement>,
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
    setOpenConfirmDialog(true);
  };

  const handleDialogOpen = () => {
    setSelectedRow(null);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setSelectedRow(null);
    setOpenDialog(false);
  };

  const handleConfirmDialogClose = () => {
    setOpenConfirmDialog(false);
    setSelectedRow(null);
  };

  const handleConfirmDelete = () => {
    setOpenConfirmDialog(false);
    setSelectedRow(null);
  };

  const handleCloseSnackBar = () => {
    setSnackBar({ ...snackBar, open: false });
  };

  const handleOpenSnackBar = (
    message: string,
    severity: OverridableStringUnion<AlertColor, AlertPropsColorOverrides>
  ) => {
    setSnackBar({ open: true, message, severity });
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          mb: 1,
          justifyContent: "space-between"
        }}
      >
        <Typography variant="subtitle1">User List</Typography>
        <Stack>
          <Button onClick={handleDialogOpen} variant="outlined" fullWidth startIcon={<AddCircle />}>
            Add
          </Button>
        </Stack>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "calc(100vh - 190px)",
          overflow: "auto",
        }}
        ref={parentRef}
      >
        {isLoading && (
          <Stack alignItems="center" justifyContent="center" height="100%">
            <CircularProgress />
            <Typography variant="subtitle2" sx={{ mt: 2 }}>
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
            <DataGridHeader
              table={table}
              handleFilterIconClick={handleFilterIconClick}
            />
            <DataGridRow
              table={table}
              rowVirtualizer={rowVirtualizer}
              menuAnchorEl={menuAnchorEl}
              handleMenuClose={handleMenuClose}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
            <FilterPopover
              anchorEl={anchorEl}
              handleClose={handleClose}
              currentColumn={currentColumn}
              handleSort={handleSort}
            />
          </>
        )}
        <UserDialog
          openToast={(message, severity) =>
            handleOpenSnackBar(message, severity)
          }
          mockId={mockId}
          selectedRow={selectedRow}
          openDialog={openDialog}
          handleDialogClose={handleDialogClose}
        />
        <ConfirmDialog
          openToast={(message, severity) =>
            handleOpenSnackBar(message, severity)
          }
          selectedRow={selectedRow}
          openConfirmDialog={openConfirmDialog}
          handleConfirmDialogClose={handleConfirmDialogClose}
          handleConfirmDelete={handleConfirmDelete}
        />
        <SnackBar
          severity={snackBar.severity}
          handleClose={handleCloseSnackBar}
          open={snackBar.open}
          message={snackBar.message}
        />
      </Box>
    </>
  );
};

export default DataGrid;
