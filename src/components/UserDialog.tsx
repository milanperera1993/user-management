import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Row } from "@tanstack/react-table";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { RowData } from "./DataGrid";
import {
  useAddUserMutation,
  User,
  useUpdateUserMutation,
} from "../redux/features/users/usersApi";

interface UserDialogProps {
  openDialog: boolean;
  handleDialogClose: () => void;
  selectedRow: Row<RowData> | null;
  mockId: string;
}

const UserDialog = (props: UserDialogProps) => {
  const { openDialog, handleDialogClose, selectedRow, mockId } = props;
  const [addUser, { isLoading }] = useAddUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const initialValues = {
    id: selectedRow?.original.id || "",
    name: selectedRow?.original.name || "",
    age: selectedRow?.original.age || "",
    city: selectedRow?.original.city || "",
  };

  const isEdit = selectedRow?.original;

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    age: Yup.number()
      .required("Age is required")
      .positive("Age must be positive")
      .integer("Age must be an integer"),
    city: Yup.string().required("City is required"),
  });

  const handleSubmit = (
    values: User,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    values.age = values.age.toString();
    if (!isEdit) {
      values.id = mockId;
      handleAddUser(values, { setSubmitting });
    } else {
      handleUpdateUser(values, { setSubmitting });
    }

    handleDialogClose();
  };

  const handleAddUser = async (
    values: User,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      await addUser(values).unwrap();
      handleDialogClose();
    } catch (error) {
      console.error("Failed to add user:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateUser = async (
    values: User,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      await updateUser({ ...values }).unwrap();
      // toast
      handleDialogClose();
    } catch (error) {
      console.error("Failed to update user:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={openDialog} onClose={handleDialogClose}>
      <DialogTitle>{`${isEdit ? "Edit" : "Add"}`} User</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <Field
                as={TextField}
                autoFocus
                margin="dense"
                id="name"
                name="name"
                label="Name"
                type="text"
                fullWidth
                variant="standard"
                helperText={<ErrorMessage name="name" />}
                error={touched.name && Boolean(errors.name)}
              />
              <Field
                as={TextField}
                margin="dense"
                id="age"
                name="age"
                label="Age"
                type="number"
                fullWidth
                variant="standard"
                helperText={<ErrorMessage name="age" />}
                error={touched.age && Boolean(errors.age)}
              />
              <Field
                as={TextField}
                margin="dense"
                id="city"
                name="city"
                label="City"
                type="text"
                fullWidth
                variant="standard"
                helperText={<ErrorMessage name="city" />}
                error={touched.city && Boolean(errors.city)}
              />
              <DialogActions>
                <Button
                  onClick={handleDialogClose}
                  disabled={isSubmitting || isLoading || isUpdating}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting || isLoading || isUpdating}
                >
                  {`${isEdit ? "Edit" : "Add"}`}
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default UserDialog;
