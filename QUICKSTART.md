# Quick Start Guide - Employee Management System

## ⚡ Quick Start (5 Minutes)

### Prerequisites
- Dev container is running ✅
- SQL Server container is running (should be in docker-compose)
- All code has been generated ✅

### Terminal 1: Start the Backend

```bash
cd /workspaces/sce4_lab/EmployeeService
dotnet run
```

**Expected output:**
```
Building...
info: Microsoft.EntityFrameworkCore.Database.Command[20101]
Executed DbCommand (114ms) [Parameters=[], CommandType='Text']
CREATE DATABASE [WEBAPI_DB];

Now listening on: http://localhost:5000
Now listening on: https://localhost:5001
```

### Terminal 2: Start the Frontend

```bash
bun dev
```

**Expected output:**
```
  VITE v7.2.6  ready in 234 ms

  ➜  Local:   http://localhost:5173/
  ➜  Press h to show help
```

### Step 3: Open in Browser

Click the link in the VS Code notification or open:
```
http://localhost:5173
```

You should see a purple gradient background with the Employee Management table.

---

## 🔍 What's Working

✅ **Frontend:**
- React + TypeScript + Vite
- EmployeeGrid component with table display
- Search by ID functionality
- Delete button for each employee
- Loading and error states
- Responsive mobile-friendly design

✅ **Backend:**
- ASP.NET Core Web API
- Entity Framework Core with SQL Server
- Full CRUD endpoints (`GET`, `POST`, `PUT`, `DELETE`)
- CORS enabled for frontend
- Automatic database migrations
- Sample data seeding (10 employees)

✅ **Database:**
- SQL Server 2022 running in Docker
- Employees table with ID, FirstName, LastName, Gender, Salary
- Auto-populated with sample data

---

## 🌐 API Endpoints

**Get all employees:**
```
GET http://localhost:5000/api/employees
```

**Get specific employee:**
```
GET http://localhost:5000/api/employees/1
```

**Create employee:**
```
POST http://localhost:5000/api/employees
Content-Type: application/json

{
  "firstName": "Jane",
  "lastName": "Doe",
  "gender": "Female",
  "salary": 55000
}
```

**Update employee:**
```
PUT http://localhost:5000/api/employees/1
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Smith",
  "gender": "Male",
  "salary": 65000
}
```

**Delete employee:**
```
DELETE http://localhost:5000/api/employees/1
```

---

## 📂 File Structure

```
sce4_lab/
├── EmployeeService/                 # ASP.NET Core Backend
│   ├── Controllers/EmployeesController.cs    # API endpoints
│   ├── Models/
│   │   ├── Employee.cs              # Employee model
│   │   └── EmployeeDbContext.cs     # EF Core DbContext
│   ├── Data/SeedData.cs             # Sample data
│   ├── Migrations/                  # EF Core migrations
│   ├── Program.cs                   # Startup configuration
│   ├── appsettings.json             # Connection strings
│   └── EmployeeService.csproj
│
├── front/                           # React Frontend
│   ├── src/
│   │   ├── components/EmployeeGrid.tsx      # Main component
│   │   ├── styles/Employee.css              # Grid styling
│   │   ├── App.tsx                  # App wrapper
│   │   ├── App.css                  # App styling
│   │   └── main.tsx                 # Entry point
│   ├── package.json                 # Dependencies
│   ├── vite.config.ts               # Vite configuration
│   └── tsconfig.json                # TypeScript config
│
├── IMPLEMENTATION.md                # Full documentation
├── startup.sh                       # Helper startup script
└── README.md
```

---

## 🐛 Troubleshooting

### Backend won't start
**Error:** "Port 5000 already in use"
```bash
# Kill existing process
lsof -ti:5000 | xargs kill -9
# Or use a different port
dotnet run --urls "http://localhost:5001"
```

**Error:** "Cannot connect to database"
- Ensure SQL Server container is running
- Check connection string in `EmployeeService/appsettings.json`
- Database name should be: `WEBAPI_DB`

### Frontend won't start
**Error:** "Command not found: npm"
```bash
# Use bun instead
bun run dev
```

### API calls failing (frontend)
- Check browser DevTools Console for errors
- Verify backend is running on `http://localhost:5000`
- Check CORS error in browser
- Update `API_URL` in `front/src/components/EmployeeGrid.tsx` if backend port changed

---

## 🔧 Configuration

### Backend Port
Edit `EmployeeService/Properties/launchSettings.json`:
```json
"applicationUrl": "http://localhost:5000;https://localhost:5001"
```

### Frontend Port
Edit `front/vite.config.ts`:
```typescript
export default defineConfig({
  server: {
    port: 5173
  }
})
```

### API URL in Frontend
Edit `front/src/components/EmployeeGrid.tsx`:
```typescript
const API_URL = 'http://localhost:5000/api/employees';
```

---

## 📚 Next Steps

1. **Add Edit functionality** - Implement PUT endpoint UI
2. **Form validation** - Add input validation on frontend
3. **Authentication** - Add JWT token support
4. **Pagination** - Handle large employee lists
5. **Sorting** - Add column sorting
6. **Filtering** - Filter by gender, salary range, etc.
7. **Testing** - Add unit and integration tests

---

## 📖 Documentation

- **Full Guide:** See `IMPLEMENTATION.md`
- **Spec Reference:** See `.ai/plan/spec.md`
- **Backend API:** Visit `http://localhost:5000/openapi/v1.json` (OpenAPI schema)

---

## ✨ Built With

| Tool | Version | Purpose |
|------|---------|---------|
| .NET | 10.0 | Backend runtime |
| ASP.NET Core | 10.0 | Web API framework |
| Entity Framework Core | 10.0 | Database ORM |
| SQL Server | 2022 | Database |
| React | 19.2 | Frontend framework |
| TypeScript | 5.9 | Type safety |
| Vite | 7.2 | Frontend bundler |
| Bun | Latest | JavaScript runtime |

---

**🎉 Your Employee Management System is ready to use!**
