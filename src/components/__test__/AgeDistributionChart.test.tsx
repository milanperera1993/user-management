import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AgeDistributionChart from '../AgeDistributionChart';

describe('AgeDistributionChart', () => {
  test('renders loading state', () => {
    render(<AgeDistributionChart users={[]} isLoading={true} isError={false} />);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test('renders error message when isError is true', () => {
    render(<AgeDistributionChart users={[]} isLoading={false} isError={true} />);

    expect(screen.getByText(/Error while fetching data./i)).toBeInTheDocument();
  });
});