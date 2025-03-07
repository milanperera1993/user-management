import {
  AlertColor,
  AlertPropsColorOverrides,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Row } from "@tanstack/react-table";
import { RowData } from "./DataGrid";
import { useDeleteUserMutation } from "../redux/features/users/usersApi";
import { OverridableStringUnion } from "@mui/types";

interface ConfirmDialogProps {
  openConfirmDialog: boolean;
  handleConfirmDialogClose: () => void;
  handleConfirmDelete: () => void;
  selectedRow: Row<RowData> | null;
  openToast : (message: string,   severity: OverridableStringUnion<AlertColor, AlertPropsColorOverrides>) => void
}

const ConfirmDialog = (props: ConfirmDialogProps) => {
  const {
    openConfirmDialog,
    handleConfirmDialogClose,
    handleConfirmDelete,
    selectedRow,
    openToast
  } = props;

  const [deleteUser] = useDeleteUserMutation();

  const handleDelete = async () => {
    try {
      await deleteUser(selectedRow?.original.id).unwrap();
    } catch (error) {
      console.log("error deleting user", error)
      openToast("Failed to delete user", "error")
    } finally {
      openToast("Successfully deleted user", "success")
      handleConfirmDelete();
    }
  };
  return (
    <Dialog open={openConfirmDialog} onClose={handleConfirmDialogClose}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this user?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleConfirmDialogClose}>Cancel</Button>
        <Button onClick={handleDelete} color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ConfirmDialog;
