import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CityDistributionChart from '../CityDistributionChart';


describe('CityDistributionChart', () => {
  test('renders loading state', () => {
    render(<CityDistributionChart users={[]} isLoading={true} isError={false} />);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test('renders error message when isError is true', () => {
    render(<CityDistributionChart users={[]} isLoading={false} isError={true} />);

    expect(screen.getByText(/Error while fetching data./i)).toBeInTheDocument();
  });

  test('does not render chart when users array is empty', () => {
    render(<CityDistributionChart users={[]} isLoading={false} isError={false} />);

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});