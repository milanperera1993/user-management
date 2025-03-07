import { render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import UserDialog from '../UserDialog';
import { User } from '../../redux/features/users/usersApi';
import { Row } from '@tanstack/react-table';

const mockUser: User = { id: '1', name: 'Milan Perera', age: "31", city: 'Colombo' };
const selectedRow: Row<User> = { original: mockUser } as Row<User>;

const handleDialogClose = jest.fn();
const openToast = jest.fn();

jest.mock('../../redux/features/users/usersApi', () => ({
  useAddUserMutation: () => [jest.fn().mockResolvedValue({}), { isLoading: false }],
  useUpdateUserMutation: () => [jest.fn().mockResolvedValue({}), { isLoading: false }],
}));

describe('UserDialog', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders UserDialog component for adding a user', () => {
    render(
      <UserDialog
        openToast={openToast}
        mockId="2"
        selectedRow={null}
        openDialog={true}
        handleDialogClose={handleDialogClose}
      />
    );
    expect(screen.getByText(/Add User/i)).toBeInTheDocument();
  });

  test('renders UserDialog component for editing a user', () => {
    render(
      <UserDialog
        openToast={openToast}
        mockId="2"
        selectedRow={selectedRow}
        openDialog={true}
        handleDialogClose={handleDialogClose}
      />
    );
    expect(screen.getByDisplayValue(/Milan Perera/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/31/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/Colombo/i)).toBeInTheDocument();
  });
});