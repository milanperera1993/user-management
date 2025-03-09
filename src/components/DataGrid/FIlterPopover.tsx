import { Box, Popover, Stack, TextField, Typography } from "@mui/material";
import { Header } from "@tanstack/react-table";
import { RowData } from "./DataGrid";

interface FilterPopoverProps {
  anchorEl: SVGElement | null
  handleClose: () => void
  currentColumn: Header<RowData, unknown> | null
  handleSort: (order: string) => void
}

const FIlterPopover = (props: FilterPopoverProps) => {
  const {anchorEl, handleClose, currentColumn, handleSort} = props
  
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
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
                currentColumn.column.setFilterValue(e.target.value || undefined)
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
  );
};
export default FIlterPopover;
