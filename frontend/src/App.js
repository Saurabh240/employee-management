import React, { useState, useEffect } from 'react';
import EmployeeService from './employeeService';
import './App.css';

const App = () => {
    const [employees, setEmployees] = useState([]);
    const [employee, setEmployee] = useState({ name: '', department: '', salary: '' });
    const [isUpdate, setIsUpdate] = useState(false);
    const [employeeId, setEmployeeId] = useState(null);

    useEffect(() => {
        loadEmployees();
    }, []);

    const loadEmployees = () => {
        EmployeeService.getEmployees().then((res) => {
            setEmployees(res.data);
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isUpdate) {
            EmployeeService.updateEmployee(employeeId, employee).then(() => {
                setEmployee({ name: '', department: '', salary: '' });
                setIsUpdate(false);
                loadEmployees();
            });
        } else {
            EmployeeService.createEmployee(employee).then(() => {
                setEmployee({ name: '', department: '', salary: '' });
                loadEmployees();
            });
        }
    };

    const handleEdit = (id) => {
        EmployeeService.getEmployeeById(id).then((res) => {
            setEmployee(res.data);
            setEmployeeId(id);
            setIsUpdate(true);
        });
    };

    const handleDelete = (id) => {
        EmployeeService.deleteEmployee(id).then(() => {
            loadEmployees();
        });
    };

    return (
        <div className="container">
            <h2>Employee Management</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={employee.name}
                    onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Department"
                    value={employee.department}
                    onChange={(e) => setEmployee({ ...employee, department: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Salary"
                    value={employee.salary}
                    onChange={(e) => setEmployee({ ...employee, salary: e.target.value })}
                />
                <button type="submit">{isUpdate ? 'Update' : 'Create'}</button>
            </form>
            <h3>Employee List</h3>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Salary</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((emp) => (
                        <tr key={emp.id}>
                            <td>{emp.name}</td>
                            <td>{emp.department}</td>
                            <td>{emp.salary}</td>
                            <td>
                                <button onClick={() => handleEdit(emp.id)}>Edit</button>
                                <button onClick={() => handleDelete(emp.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default App;

