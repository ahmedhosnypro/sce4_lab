using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EmployeeService.Models;

namespace EmployeeService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesController : ControllerBase
    {
        private readonly EmployeeDbContext _context;

        public EmployeesController(EmployeeDbContext context)
        {
            _context = context;
        }

        // GET: api/employees
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
        {
            var employees = await _context.Employees.ToListAsync();
            return Ok(employees);
        }

        // GET: api/employees/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
            var employee = await _context.Employees.FirstOrDefaultAsync(e => e.ID == id);

            if (employee == null)
            {
                return NotFound(new { message = $"Employee with ID {id} not found." });
            }

            return Ok(employee);
        }

        // POST: api/employees
        [HttpPost]
        public async Task<ActionResult<Employee>> PostEmployee([FromBody] Employee employee)
        {
            try
            {
                _context.Employees.Add(employee);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetEmployee), new { id = employee.ID }, employee);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Error creating employee", error = ex.Message });
            }
        }

        // PUT: api/employees/5
        [HttpPut("{id}")]
        public async Task<ActionResult<Employee>> PutEmployee(int id, [FromBody] Employee employee)
        {
            try
            {
                var entity = await _context.Employees.FirstOrDefaultAsync(e => e.ID == id);
                
                if (entity == null)
                {
                    return NotFound(new { message = $"Employee with ID {id} not found." });
                }

                entity.FirstName = employee.FirstName;
                entity.LastName = employee.LastName;
                entity.Gender = employee.Gender;
                entity.Salary = employee.Salary;

                _context.Employees.Update(entity);
                await _context.SaveChangesAsync();
                
                return Ok(entity);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Error updating employee", error = ex.Message });
            }
        }

        // DELETE: api/employees/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            try
            {
                var entity = await _context.Employees.FirstOrDefaultAsync(e => e.ID == id);
                
                if (entity == null)
                {
                    return NotFound(new { message = $"Employee with ID {id} not found." });
                }

                _context.Employees.Remove(entity);
                await _context.SaveChangesAsync();
                
                return Ok(new { message = "Employee deleted successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Error deleting employee", error = ex.Message });
            }
        }
    }
}
