using EmployeeService.Models;

namespace EmployeeService.Data
{
    public static class SeedData
    {
        public static void Initialize(EmployeeDbContext context)
        {
            // Check if data already exists
            if (context.Employees.Any())
            {
                return;
            }

            var employees = new Employee[]
            {
                new Employee { FirstName = "Pranaya", LastName = "Rout", Gender = "Male", Salary = 60000 },
                new Employee { FirstName = "Anurag", LastName = "Mohanty", Gender = "Male", Salary = 45000 },
                new Employee { FirstName = "Preety", LastName = "Tiwari", Gender = "Female", Salary = 45000 },
                new Employee { FirstName = "Sambit", LastName = "Mohanty", Gender = "Male", Salary = 70000 },
                new Employee { FirstName = "Shushanta", LastName = "Jena", Gender = "Male", Salary = 45000 },
                new Employee { FirstName = "Priyanka", LastName = "Dewangan", Gender = "Female", Salary = 30000 },
                new Employee { FirstName = "Sandeep", LastName = "Kiran", Gender = "Male", Salary = 45000 },
                new Employee { FirstName = "Shudhansshu", LastName = "Nayak", Gender = "Male", Salary = 30000 },
                new Employee { FirstName = "Hina", LastName = "Sharma", Gender = "Female", Salary = 35000 },
                new Employee { FirstName = "Preetiranjan", LastName = "Sahoo", Gender = "Male", Salary = 80000 }
            };

            context.Employees.AddRange(employees);
            context.SaveChanges();
        }
    }
}
