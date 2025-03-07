import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Snackbar from '../SnackBar';

describe('Snackbar', () => {
  const handleClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders Snackbar component with message', () => {
    render(
      <Snackbar
        open={true}
        message="Test message"
        severity="success"
        handleClose={handleClose}
      />
    );
    expect(screen.getByText(/Test message/i)).toBeInTheDocument();
  });

  test('calls handleClose when close button is clicked', () => {
    render(
      <Snackbar
        open={true}
        message="Test message"
        severity="success"
        handleClose={handleClose}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(handleClose).toHaveBeenCalled();
  });

  test('does not render Snackbar when open is false', () => {
    render(
      <Snackbar
        open={false}
        message="Test message"
        severity="success"
        handleClose={handleClose}
      />
    );
    expect(screen.queryByText(/Test message/i)).not.toBeInTheDocument();
  });
});