using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EmployeeService.Models
{
    [Table("Employees")]
    public class Employee
    {
        [Key]
        public int ID { get; set; }
        
        public string? FirstName { get; set; }
        
        public string? LastName { get; set; }
        
        public string? Gender { get; set; }
        
        public int Salary { get; set; }
    }
}
