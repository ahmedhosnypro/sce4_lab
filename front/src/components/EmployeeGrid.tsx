import { useState, useEffect, useCallback } from 'react';
import { API_URL } from '../config';
import '../styles/Employee.css';

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  salary: number;
}

function EmployeeGrid() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchId, setSearchId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  // Fetch all employees
  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch employees');
      const data = await response.json();
      setEmployees(data);
    } catch (err) {
      setError('Error fetching employee data');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  // Fetch specific employee or all if empty
  const fetchEmployeeById = useCallback(async () => {
    if (searchId.trim() === '') {
      fetchEmployees();
    } else {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_URL}/${searchId}`);
        if (!response.ok) throw new Error('Employee not found');
        const data = await response.json();
        setEmployees([data]);
      } catch (err) {
        setError('Employee not found');
        setEmployees([]);
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    }
  }, [searchId, fetchEmployees]);

  const deleteEmployee = useCallback(async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee.id !== id));
      } else {
        setError('Failed to delete employee');
      }
    } catch (err) {
      setError('Error deleting employee');
      console.error('Error:', err);
    }
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      fetchEmployeeById();
    }
  }, [fetchEmployeeById]);

  return (
    <div className="employee-grid">
      <div className="search-section">
        <input
          type="text"
          placeholder="Enter Employee ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={fetchEmployeeById}>Search</button>
        <button onClick={fetchEmployees} className="button-secondary">
          X
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}
      {loading && <div className="loading-message">Loading...</div>}

      <div className="table-container">
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
          {employees.length > 0 ? (
            employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.gender}</td>
                <td>${employee.salary.toLocaleString()}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => deleteEmployee(employee.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            !loading && (
              <tr>
                <td colSpan={6} className="no-data">
                  No employees found
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default EmployeeGrid;
