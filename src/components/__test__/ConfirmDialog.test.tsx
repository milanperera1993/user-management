import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ConfirmDialog from '../ConfirmDialog';
import { Row } from '@tanstack/react-table';
import { User } from '../../redux/features/users/usersApi';

const mockUser: User = { id: '1', name: 'Milan Perera', age: "31", city: 'Colombo' };
const selectedRow: Row<User> = { original: mockUser } as Row<User>;

const handleConfirmDialogClose = jest.fn();
const handleConfirmDelete = jest.fn();
const openToast = jest.fn();

jest.mock('../../redux/features/users/usersApi', () => ({
  useDeleteUserMutation: () => [jest.fn().mockResolvedValue({})],
}));

describe('ConfirmDialog', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders ConfirmDialog component', () => {
    render(
      <ConfirmDialog
        openConfirmDialog={true}
        handleConfirmDialogClose={handleConfirmDialogClose}
        handleConfirmDelete={handleConfirmDelete}
        selectedRow={selectedRow}
        openToast={openToast}
      />
    );
    expect(screen.getByText(/Confirm Delete/i)).toBeInTheDocument();
    expect(screen.getByText(/Are you sure you want to delete this user?/i)).toBeInTheDocument();
  });

  test('calls handleConfirmDialogClose when Cancel button is clicked', () => {
    render(
      <ConfirmDialog
        openConfirmDialog={true}
        handleConfirmDialogClose={handleConfirmDialogClose}
        handleConfirmDelete={handleConfirmDelete}
        selectedRow={selectedRow}
        openToast={openToast}
      />
    );
    fireEvent.click(screen.getByText(/Cancel/i));
    expect(handleConfirmDialogClose).toHaveBeenCalled();
  });

  test('calls handleDelete when Delete button is clicked', async () => {
    render(
      <ConfirmDialog
        openConfirmDialog={true}
        handleConfirmDialogClose={handleConfirmDialogClose}
        handleConfirmDelete={handleConfirmDelete}
        selectedRow={selectedRow}
        openToast={openToast}
      />
    );
    fireEvent.click(screen.getByText('Delete', { exact: true }));
    expect(openToast).toHaveBeenCalledWith('Successfully deleted user', 'success');
    expect(handleConfirmDelete).toHaveBeenCalled();
  });

  test('shows error toast when delete fails', async () => {
    jest.mock('../../redux/features/users/usersApi', () => ({
      useDeleteUserMutation: () => [jest.fn().mockRejectedValue(new Error('Failed to delete user'))],
    }));

    render(
      <ConfirmDialog
        openConfirmDialog={true}
        handleConfirmDialogClose={handleConfirmDialogClose}
        handleConfirmDelete={handleConfirmDelete}
        selectedRow={selectedRow}
        openToast={openToast}
      />
    );
    fireEvent.click(screen.getByText('Delete', { exact: true }));
    expect(openToast).toHaveBeenCalledWith('Failed to delete user', 'error');
  });
});