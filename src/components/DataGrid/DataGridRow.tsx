import { flexRender, Table } from "@tanstack/react-table";
import { Virtualizer } from "@tanstack/react-virtual";
import { User } from "../../redux/features/users/usersApi";
import { Menu, MenuItem } from "@mui/material";

interface DataGridRowProps {
  table: Table<User>;
  rowVirtualizer: Virtualizer<HTMLDivElement, Element>;
  menuAnchorEl: HTMLElement | null;
  handleMenuClose: () => void;
  handleEdit: () => void;
  handleDelete: () => void;
}

const DataGridRow = (props: DataGridRowProps) => {
  const {
    table,
    rowVirtualizer,
    menuAnchorEl,
    handleMenuClose,
    handleDelete,
    handleEdit,
  } = props;

  return (
    <>
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
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </>
  );
};
export default DataGridRow;
