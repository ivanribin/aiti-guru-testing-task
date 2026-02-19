# Products Management Dashboard

A React-based administrative interface for managing products with authentication, sorting, and CRUD operations.

## Technologies Used

- React 18+
- TypeScript
- PrimeReact for UI components
- React Hook Form for form handling
- React Router DOM for navigation
- CSS Modules for styling

## Features

### Authentication

- Login form with field validation
- Error handling with API error messages
- Session persistence option (remember me)
- Token-based authentication

### Products Table

- Fetches data from DummyJSON API
- Loading skeleton and progress indicators
- Sortable columns (price, rating, etc.)
- Visual indicators for low-rated products (rating < 3 highlighted in red)
- Responsive table layout with fixed columns

### Product Management

- Add new products via modal form
- Form fields: title, price, brand, SKU
- Success toast notifications
- Search functionality using API

## Installation

Clone the repository and install dependencies:

```bash
git clone <https://github.com/ivanribin/aiti-guru-testing-task.git>
cd aiti-guru-testing-task
npm install
```

---

## Configuration

Create a `.env` file in the root (optional):

### Copy the environment template file:

```bash
cp .env.example .env
```

Fill in the required environment variables in the newly created .env file

---

## Available NPM Scripts

| Script            | Description                                 |
| ----------------- | ------------------------------------------- |
| `npm run dev`     | Start in development mode                   |
| `npm run build`   | Compile TypeScript to JavaScript in `dist/` |
| `npm run preview` | Run compiled app from `dist/`               |

---

## Running the Project

**Development:**

```bash
npm run dev
```

**Production:**

```bash
npm run build
npm run preview
```

By default, the server runs on:  
`http://localhost:5173` in development mode
`http://localhost:4173` in production mode
