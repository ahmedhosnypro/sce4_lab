# SCE4 Lab - SQL Server & ASP.NET Web API

This project is configured to run in a dev container with:
- **ASP.NET Core Web API**
- **SQL Server 2022 (Developer Edition)**
- **Entity Framework Core**

## Setup Instructions

### 1. Open in Dev Container
- Open the workspace in VS Code
- When prompted, click "Reopen in Container" or use Command Palette: `Dev Containers: Reopen in Container`

### 2. Create ASP.NET Web API Project (if not exists)
```bash
cd /workspace
dotnet new webapi -n Api
cd Api
```

### 3. Add Entity Framework Core
```bash
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Design
```

### 4. Create Database Context
Example DbContext setup (create in `Data/AppDbContext.cs`):
```csharp
using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    
    // Add your DbSets here
    // public DbSet<YourEntity> YourEntities { get; set; }
}
```

### 5. Configure Services
In `Program.cs`:
```csharp
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(connectionString));
```

### 6. Create & Apply Migrations
```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
```

## SQL Server Connection Details
- **Server**: `mssql` (or `localhost,1433` from host)
- **SA Username**: `sa`
- **SA Password**: `YourPassword123!`
- **Port**: `1433`

## Running the Application
```bash
dotnet run
```

The API will be available at:
- HTTP: `https://localhost:5001`
- HTTP: `http://localhost:5000`

## Connecting to SQL Server

### From Terminal
```bash
sqlcmd -S mssql -U sa -P YourPassword123!
```

### From VS Code
- Install MS SQL extension (already included)
- Create new connection:
  - Server: `mssql,1433`
  - Authentication: SQL Login
  - Username: `sa`
  - Password: `YourPassword123!`

## Useful Commands
- `dotnet watch run` - Run with auto-reload
- `dotnet ef database update` - Apply migrations
- `dotnet ef migrations add MigrationName` - Create new migration
