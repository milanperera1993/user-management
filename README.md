# User Management | Take Home Assignment

This project is a user management system built with React, Redux Toolkit, and Material-UI. It includes features for adding, updating, and deleting users, as well as displaying user data in a table and visualizing user demographics with charts.

## Features

- Add, update, and delete users
- Display user data in a table
- Visualize user demographics with pie and bar charts
- Responsive design
- Dark mode support

## Installation

### Prerequisites

- **Node.js** (>= 14.x)
- **npm** (>= 6.x)

### Steps

1. **Clone the repository:**

   ```sh
   git clone https://github.com/milanperera1993/user-management.git
   cd user-management
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

## Running the Project Locally

### Development Server

To start the development server, run:

   ```sh
   npm run dev
   ```

This will start the **Vite** development server and open the application in your default web browser. The application will automatically reload if you make changes to the code.

### API Server

The JSON server has been hosted using **Render**, so there is no need to run a mock server locally. The base URL for the API is configured in the project.

## Project Structure

```
user-management/
├── src/
│   ├── components/        # React components
│   ├── redux/             # Redux Toolkit slices and API services
│   ├── theme/             # Theme configuration for Material-UI
│   ├── utils/             # Utility functions
├── public/                # Static assets
├── index.html             # Main HTML file
├── package.json           # Project metadata and scripts
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
```

## Available Scripts

- **`npm run dev`** - Start the development server
- **`npm run build`** - Build the project for production
- **`npm run preview`** - Preview the production build
- **`npm run lint`** - Run ESLint to lint the code

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for more details.

## Acknowledgements

- [React](https://reactjs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Material-UI](https://mui.com/)
- [Recharts](https://recharts.org/)
- [Vite](https://vitejs.dev/)

