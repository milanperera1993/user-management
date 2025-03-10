import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NavbarBreadcrumbs from '../NavbarBreadcrumbs';
import { MenuItem } from '../common/menu';


const mockMenuItem: MenuItem = {
  text: 'User Management',
  icon: <div>Icon</div>,
  path: '/user-management',
};

describe('NavbarBreadcrumbs Component', () => {
  test('renders without crashing', () => {
    render(<NavbarBreadcrumbs menuItems={mockMenuItem} />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  test('displays the correct breadcrumb text based on menuItems prop', () => {
    render(<NavbarBreadcrumbs menuItems={mockMenuItem} />);
    expect(screen.getByText('User Management')).toBeInTheDocument();
  });

  test('displays "Dashboard" as the first breadcrumb', () => {
    render(<NavbarBreadcrumbs menuItems={mockMenuItem} />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  test('displays the correct breadcrumb text when menuItems is undefined', () => {
    render(<NavbarBreadcrumbs menuItems={undefined} />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.queryByText('User Management')).not.toBeInTheDocument();
  });
});