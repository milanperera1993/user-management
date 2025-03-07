import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CityDistributionChart from '../CityDistributionChart';
import { User } from '../../redux/features/users/usersApi';

const mockUsers: User[] = [
  { id: '1', name: 'Milan Perera', age: "30", city: 'Colombo' },
  { id: '2', name: 'TestUser', age: "25", city: 'Kandy' },
  { id: '3', name: 'TestUser2', age: "30", city: 'Galle' },
];

describe('CityDistributionChart', () => {
  test('renders loading state', () => {
    render(<CityDistributionChart users={[]} isLoading={true} isError={false} />);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test('renders error message when isError is true', () => {
    render(<CityDistributionChart users={[]} isLoading={false} isError={true} />);

    expect(screen.getByText(/Error while fetching data./i)).toBeInTheDocument();
  });

  test('renders city distribution chart with user data', () => {
    render(<CityDistributionChart users={mockUsers} isLoading={false} isError={false} />);

    expect(screen.getByText(/City Distribution/i)).toBeInTheDocument();
    expect(screen.getByText(/Colombo/i)).toBeInTheDocument();
    expect(screen.getByText(/Kandy/i)).toBeInTheDocument();
    expect(screen.getByText(/Galle/i)).toBeInTheDocument();
  });

  test('does not render chart when users array is empty', () => {
    render(<CityDistributionChart users={[]} isLoading={false} isError={false} />);

    expect(screen.queryByRole('img')).not.toBeInTheDocument(); // Assuming the chart renders an <img> element
  });
});