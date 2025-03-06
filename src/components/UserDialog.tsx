import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface UserDialogProps {
  openDialog: boolean;
  handleDialogClose: () => void;
}

const UserDialog = (props: UserDialogProps) => {
  const { openDialog, handleDialogClose } = props;

  const initialValues = {
    name: "",
    age: "",
    city: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    age: Yup.number().required("Age is required").positive("Age must be positive").integer("Age must be an integer"),
    city: Yup.string().required("City is required"),
  });

  const handleSubmit = (values: typeof initialValues) => {
    console.log("Form data", values);
    handleDialogClose();
  };

  return (
    <Dialog open={openDialog} onClose={handleDialogClose}>
      <DialogTitle>Add User</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To add a new user, please enter the user's details here.
        </DialogContentText>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
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
                <Button onClick={handleDialogClose} disabled={isSubmitting}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  Add
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