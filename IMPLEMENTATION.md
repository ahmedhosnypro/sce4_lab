# Employee Management System

A full-stack web application for managing employees with a React frontend and ASP.NET Core Web API backend connected to SQL Server.

## Project Structure

```
sce4_lab/
├── EmployeeService/          # Backend - ASP.NET Core Web API
│   ├── Controllers/          # API endpoints
│   ├── Models/              # Data models (Employee, DbContext)
│   ├── Data/                # Database seeding
│   ├── Migrations/          # Entity Framework migrations
│   └── Program.cs           # App configuration
├── front/                    # Frontend - React + Vite + TypeScript
│   ├── src/
│   │   ├── components/      # React components (EmployeeGrid)
│   │   ├── styles/          # CSS stylesheets
│   │   ├── App.tsx          # Main app component
│   │   └── main.tsx         # Entry point
│   └── package.json
└── appsettings.json         # Connection string config
```

## Tech Stack

**Backend:**
- .NET 10.0
- ASP.NET Core Web API
- Entity Framework Core 10.0.0
- SQL Server 2022

**Frontend:**
- React 19.2.0
- TypeScript 5.9.3
- Vite 7.2.4
- CSS3

## Prerequisites

The dev container includes all necessary tools:
- .NET SDK 10.0
- Node.js & Bun
- SQL Server 2022 (via Docker)
- Git

## Running the Application

### 1. Start SQL Server Container

The SQL Server container should be running. If not, ensure Docker is available:

```bash
# Check if container is running (from host machine if needed)
docker ps | grep mssql
```

The connection string points to `mssql:1433` (container hostname) with:
- User: `sa`
- Password: `YourPassword123!`
- Database: `WEBAPI_DB`

### 2. Start the Backend (ASP.NET Core API)

```bash
cd /workspaces/sce4_lab/EmployeeService
dotnet run
```

The backend will:
- Apply database migrations automatically
- Seed sample data (10 employees) on first run
- Start listening on `http://localhost:5000` and `https://localhost:5001`

**CORS enabled for:** 
- `http://localhost:3000` (frontend)
- `http://localhost:5173` (Vite dev server)

### 3. Start the Frontend (React)

In a new terminal:

```bash
cd /workspaces/sce4_lab/front
bun install   # if node_modules missing
bun run dev
```

The frontend will:
- Start on `http://localhost:5173` (Vite default)
- Auto-reload on code changes (HMR enabled)

### 4. Access the Application

Open your browser and navigate to:
- **Frontend:** `http://localhost:5173`
- **Backend API Docs:** `http://localhost:5000/openapi/v1.json` (OpenAPI/Swagger)

## API Endpoints

All endpoints are prefixed with `/api/employees`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all employees |
| GET | `/{id}` | Get employee by ID |
| POST | `/` | Create new employee |
| PUT | `/{id}` | Update employee |
| DELETE | `/{id}` | Delete employee |

### Example Requests

**Get all employees:**
```bash
curl http://localhost:5000/api/employees
```

**Get employee by ID:**
```bash
curl http://localhost:5000/api/employees/1
```

**Create employee:**
```bash
curl -X POST http://localhost:5000/api/employees \
  -H "Content-Type: application/json" \
  -d '{"firstName":"John","lastName":"Doe","gender":"Male","salary":50000}'
```

**Delete employee:**
```bash
curl -X DELETE http://localhost:5000/api/employees/1
```

## Frontend Features

- **Employee Grid:** Display all employees in a table
- **Search by ID:** Filter employees by their ID
- **Delete:** Remove employees from the database
- **Loading States:** Visual feedback during API calls
- **Error Handling:** User-friendly error messages
- **Responsive Design:** Works on desktop and mobile

## Database Schema

### Employees Table

```sql
CREATE TABLE Employees (
    ID int PRIMARY KEY IDENTITY(1,1),
    FirstName nvarchar(50),
    LastName nvarchar(50),
    Gender nvarchar(50),
    Salary int
);
```

### Sample Data (Auto-Seeded)

The application automatically inserts 10 sample employees on first run:
- Pranaya Rout (Male, $60,000)
- Anurag Mohanty (Male, $45,000)
- Preety Tiwari (Female, $45,000)
- Sambit Mohanty (Male, $70,000)
- Shushanta Jena (Male, $45,000)
- Priyanka Dewangan (Female, $30,000)
- Sandeep Kiran (Male, $45,000)
- Shudhansshu Nayak (Male, $30,000)
- Hina Sharma (Female, $35,000)
- Preetiranjan Sahoo (Male, $80,000)

## Development

### Backend Development

**Create a new migration:**
```bash
cd EmployeeService
dotnet ef migrations add MigrationName
dotnet ef database update
```

**Run backend tests (if added):**
```bash
dotnet test
```

### Frontend Development

**Available scripts:**
```bash
bun run dev      # Start dev server
bun run build    # Build for production
bun run preview  # Preview production build
bun run lint     # Run ESLint
```

## Troubleshooting

### Backend Issues

**Port already in use:**
```bash
# Change port in launchSettings.json or use:
dotnet run --urls "http://localhost:5001"
```

**Database connection failed:**
- Verify SQL Server container is running
- Check connection string in `appsettings.json`
- Ensure Docker network allows container communication

**Migration issues:**
```bash
dotnet ef database drop   # Reset database
dotnet ef database update # Re-apply migrations
```

### Frontend Issues

**Port 5173 in use:**
```bash
bun run dev --host localhost --port 3001
```

**API calls failing:**
- Verify backend is running on `http://localhost:5000`
- Check browser console for CORS errors
- Ensure API_URL in `EmployeeGrid.tsx` matches backend port

**Dependencies missing:**
```bash
cd front
bun install --force
```

## API Configuration

To change the API port in the frontend, edit `/front/src/components/EmployeeGrid.tsx`:

```typescript
const API_URL = 'http://localhost:5000/api/employees';  // Change port here
```

To change backend port, use launchSettings or environment variables.

## Performance Notes

- Frontend uses React hooks for state management
- Backend uses Entity Framework Core async operations
- CORS configured for development efficiency
- TypeScript provides type safety for frontend
- Database queries are optimized with EF Core

## License

MIT

## Additional Resources

- [ASP.NET Core Docs](https://learn.microsoft.com/en-us/aspnet/core/)
- [React Documentation](https://react.dev)
- [Entity Framework Core](https://learn.microsoft.com/en-us/ef/core/)
- [Vite Documentation](https://vite.dev)
