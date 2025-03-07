import { Alert, AlertColor, AlertPropsColorOverrides, Snackbar } from "@mui/material";
import { OverridableStringUnion } from "@mui/types";

interface SnackBarProps {
  handleClose: () => void
  open: boolean
  message: string
  severity: OverridableStringUnion<AlertColor, AlertPropsColorOverrides>
}
const SnackBar = (props: SnackBarProps) => {
  const {handleClose, open, message, severity} = props
  return (
    <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}       anchorOrigin={{ vertical: "top", horizontal: "right" }}>
      <Alert
        onClose={handleClose}
        severity= {severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
export default SnackBar;
