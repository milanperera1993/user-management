import { render, screen, fireEvent} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import DataGrid from "../DataGrid";
import { User } from "../../../redux/features/users/usersApi";
import { Provider } from "react-redux";
import { store } from "../../../redux/store";


const mockUsers: User[] = [
  { id: "1", name: "Milan Perera", age: "31", city: "Colombo" },
  { id: "2", name: "Test User", age: "25", city: "Kandy" },
];

describe("DataGrid Component", () => {
  test("renders loading state", () => {
    render(
      <Provider store={store} >
         <DataGrid isLoading={true} users={[]} isError={false} />
      </Provider>
  );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("renders error state", () => {
    render(
      <Provider store={store} >
         <DataGrid isLoading={true} users={[]} isError={false} />
      </Provider>
    );
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test("opens add user dialog on button click", () => {
    render(
      <Provider store={store}>
        <DataGrid isLoading={false} users={mockUsers} isError={false} />
      </Provider>
  );
    fireEvent.click(screen.getByText(/add/i));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
