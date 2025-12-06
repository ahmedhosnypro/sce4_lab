Here is the complete guide to building the **Employee Management System**.

This solution includes the Backend (SQL Server + ASP.NET Web API) and the Frontend (React).

---

### Part 1: The Database (SQL Server)

Run the following SQL script in SQL Server Management Studio (SSMS) to create the database and populate it with the sample data required for the experiment.

```sql
CREATE DATABASE WEBAPI_DB;
GO

USE WEBAPI_DB;
GO

CREATE TABLE Employees
(
    ID int primary key identity,
    FirstName nvarchar(50),
    LastName nvarchar(50),
    Gender nvarchar(50),
    Salary int
);
GO

INSERT INTO Employees VALUES ('Pranaya', 'Rout', 'Male', 60000);
INSERT INTO Employees VALUES ('Anurag', 'Mohanty', 'Male', 45000);
INSERT INTO Employees VALUES ('Preety', 'Tiwari', 'Female', 45000);
INSERT INTO Employees VALUES ('Sambit', 'Mohanty', 'Male', 70000);
INSERT INTO Employees VALUES ('Shushanta', 'Jena', 'Male', 45000);
INSERT INTO Employees VALUES ('Priyanka', 'Dewangan', 'Female', 30000);
INSERT INTO Employees VALUES ('Sandeep', 'Kiran', 'Male', 45000);
INSERT INTO Employees VALUES ('Shudhansshu', 'Nayak', 'Male', 30000);
INSERT INTO Employees VALUES ('Hina', 'Sharma', 'Female', 35000);
INSERT INTO Employees VALUES ('Preetiranjan', 'Sahoo', 'Male', 80000);
GO
```

---

### Part 2: The Backend (ASP.NET Web API)

**Tech Stack:** Visual Studio, ASP.NET Web API 2, Entity Framework (Code First or DB First), C#.

#### 1. Project Setup
1.  Open **Visual Studio**.
2.  Create a **New Project** -> **ASP.NET Web Application (.NET Framework)**.
3.  Name it `EmployeeService`.
4.  Select the **Web API** template. Ensure "No Authentication" is selected.

#### 2. The Model (`Models/Employee.cs`)
Create a class that matches your SQL table.

```csharp
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EmployeeService.Models
{
    [Table("Employees")]
    public class Employee
    {
        [Key]
        public int ID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public int Salary { get; set; }
    }
}
```

#### 3. The Database Context (`Models/EmployeeDBContext.cs`)
This connects the app to the SQL Database.

```csharp
using System.Data.Entity;

namespace EmployeeService.Models
{
    public class EmployeeDBContext : DbContext
    {
        // Ensure your Web.config has a connection string named "EmployeeDBContext"
        // pointing to WEBAPI_DB
        public EmployeeDBContext() : base("name=EmployeeDBContext") { }

        public DbSet<Employee> Employees { get; set; }
    }
}
```

#### 4. The Controller (`Controllers/EmployeesController.cs`)

**Important:** To allow the React frontend (Port 3000) to talk to this backend, you must enable CORS. Run `Install-Package Microsoft.AspNet.WebApi.Cors` in Package Manager Console, and add `[EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]` to the controller.

```csharp
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using EmployeeService.Models;
using System.Web.Http.Cors; // Requires Microsoft.AspNet.WebApi.Cors package

namespace EmployeeService.Controllers
{
    [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
    public class EmployeesController : ApiController
    {
        // GET: api/employees
        public IEnumerable<Employee> Get()
        {
            using (EmployeeDBContext dbContext = new EmployeeDBContext())
            {
                return dbContext.Employees.ToList();
            }
        }

        // GET: api/employees/5
        public Employee Get(int id)
        {
            using (EmployeeDBContext dbContext = new EmployeeDBContext())
            {
                return dbContext.Employees.FirstOrDefault(e => e.ID == id);
            }
        }

        // POST: api/employees
        public HttpResponseMessage Post([FromBody] Employee employee)
        {
            try
            {
                using (EmployeeDBContext dbContext = new EmployeeDBContext())
                {
                    dbContext.Employees.Add(employee);
                    dbContext.SaveChanges();
                    var message = Request.CreateResponse(HttpStatusCode.Created, employee);
                    return message;
                }
            }
            catch (System.Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        // PUT: api/employees/5
        public HttpResponseMessage Put(int id, [FromBody] Employee employee)
        {
            try
            {
                using (EmployeeDBContext dbContext = new EmployeeDBContext())
                {
                    var entity = dbContext.Employees.FirstOrDefault(e => e.ID == id);
                    if (entity == null)
                    {
                        return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Employee with ID " + id + " not found.");
                    }

                    entity.FirstName = employee.FirstName;
                    entity.LastName = employee.LastName;
                    entity.Gender = employee.Gender;
                    entity.Salary = employee.Salary;
                    
                    dbContext.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.OK, entity);
                }
            }
            catch (System.Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        // DELETE: api/employees/5
        public HttpResponseMessage Delete(int id)
        {
            try 
            {
                using (EmployeeDBContext dbContext = new EmployeeDBContext())
                {
                    var entity = dbContext.Employees.FirstOrDefault(e => e.ID == id);
                    if (entity == null)
                    {
                        return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Employee with Id " + id + " not found");
                    }
                    
                    dbContext.Employees.Remove(entity);
                    dbContext.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.OK);
                }
            }
            catch (System.Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }
    }
}
```

---

### Part 3: The Frontend (React)

**Tech Stack:** Node.js, React, CSS.

#### 1. Setup
Open your terminal and run:
```bash
npx create-react-app employee-management
cd employee-management
```

#### 2. The Styling (`src/Employee.css`)
Create this file in the `src` folder.

```css
.employee-grid {
    width: 80%;
    margin: 20px auto;
    border-collapse: collapse;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

th {
    background-color: #f4f4f4;
}

tr:hover {
    background-color: #f1f1f1;
}

input[type="text"] {
    padding: 8px;
    margin-right: 8px;
    width: 200px;
}

button {
    padding: 8px 12px;
    margin: 10px 0;
    cursor: pointer;
}
```

#### 3. The Grid Component (`src/EmployeeGrid.js`)

**Adjustments made:**
1.  Updated API endpoint to point to localhost (assuming backend runs on port `#####`).
2.  **Crucial Fix:** Updated the React code to match the SQL database structure with columns `FirstName`, `LastName`, `Gender`, `Salary` so the data actually displays.

```javascript
import React, { useState, useEffect } from 'react';
import './Employee.css'; // Import the CSS file

function EmployeeGrid() {
  const [employees, setEmployees] = useState([]);
  const [searchId, setSearchId] = useState('');

  // REPLACE WITH YOUR ACTUAL PORT FROM VISUAL STUDIO
  const API_URL = 'http://localhost:55465/api/employees'; 

  // Fetch all employees
  const fetchEmployees = () => {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        setEmployees(data);
      })
      .catch(error => console.error('Error fetching employee data:', error));
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Fetch specific employee or all if empty
  const fetchEmployeeById = () => {
    if (searchId.trim() === '') {
      fetchEmployees();
    } else {
      fetch(`${API_URL}/${searchId}`)
        .then(response => {
            if (!response.ok) throw new Error("Not Found");
            return response.json();
        })
        .then(data => {
          // Wrap single object in array to map over it in the table
          setEmployees([data]); 
        })
        .catch(error => console.error('Error fetching employee by ID:', error));
    }
  };

  const deleteEmployee = (id) => {
    fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    })
    .then(response => {
       if(response.ok) {
           setEmployees(employees.filter(employee => employee.ID !== id));
       }
    })
    .catch(error => console.error('Error deleting employee:', error));
  };

  return (
    <div className="employee-grid">
      <input
        type="text"
        placeholder="Enter Employee ID"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
      />
      <button onClick={fetchEmployeeById}>Search</button>
      
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Gender</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={employee.ID || index}>
              <td>{employee.ID}</td>
              <td>{employee.FirstName}</td>
              <td>{employee.LastName}</td>
              <td>{employee.Gender}</td>
              <td>{employee.Salary}</td>
              <td>
                <button onClick={() => deleteEmployee(employee.ID)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeGrid;
```

#### 4. The App Entry Point (`src/App.js`)

```javascript
import React from 'react';
import EmployeeGrid from './EmployeeGrid';

function App() {
  return (
    <div className="App">
      <h1 style={{textAlign: 'center'}}>Employee Management</h1>
      <EmployeeGrid />
    </div>
  );
}

export default App;
```

---

### Part 4: Running the Application

1.  **Start Backend:** Press F5 in Visual Studio. Note the port number in the browser (e.g., `localhost:55465`). Update the `API_URL` variable in `EmployeeGrid.js` with this port.
2.  **Start Frontend:** In your VS Code terminal (inside the `employee-management` folder), run:
    ```bash
    bun start
    ```
3.  **Result:** Your browser will open `http://localhost:3000`, displaying the grid of employees fetched from your SQL Server database. You can search by ID to filter or click Delete to remove records.