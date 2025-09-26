import { api } from './index';
import { Employee, EmployeeForm, PaginatedResponse, EmployeeFilters } from '../types';

export const employeeApi = {
  getEmployees: async (filters?: EmployeeFilters, page = 1, limit = 10): Promise<PaginatedResponse<Employee>> => {
    const params = new URLSearchParams();
    if (filters?.department) params.append('department', filters.department);
    if (filters?.position) params.append('position', filters.position);
    if (filters?.status) params.append('status', filters.status);
    if (filters?.search) params.append('search', filters.search);
    params.append('page', page.toString());
    params.append('limit', limit.toString());

    const response = await api.get(`/employees?${params.toString()}`);
    return response.data.data;
  },

  getEmployee: async (id: string): Promise<Employee> => {
    const response = await api.get(`/employees/${id}`);
    return response.data.data;
  },

  createEmployee: async (employeeData: EmployeeForm): Promise<Employee> => {
    const response = await api.post('/employees', employeeData);
    return response.data.data;
  },

  updateEmployee: async (id: string, employeeData: Partial<EmployeeForm>): Promise<Employee> => {
    const response = await api.put(`/employees/${id}`, employeeData);
    return response.data.data;
  },

  deleteEmployee: async (id: string): Promise<void> => {
    await api.delete(`/employees/${id}`);
  },

  getEmployeeStats: async (): Promise<{ total: number; active: number; byDepartment: Record<string, number> }> => {
    const response = await api.get('/employees/stats');
    return response.data.data;
  },

  searchEmployees: async (query: string): Promise<Employee[]> => {
    const response = await api.get(`/employees/search?q=${encodeURIComponent(query)}`);
    return response.data.data;
  },

  getEmployeesByDepartment: async (department: string): Promise<Employee[]> => {
    const response = await api.get(`/employees/department/${department}`);
    return response.data.data;
  },

  getDirectReports: async (managerId: string): Promise<Employee[]> => {
    const response = await api.get(`/employees/manager/${managerId}/reports`);
    return response.data.data;
  },
};
