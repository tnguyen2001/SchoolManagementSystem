import apiCall from '~/common/services/apiService';

export const getStudents = async () => apiCall('/students');
export const getStudentById = async (studentId) => apiCall(`/students/${studentId}`);
export const getStudentByStudentCode = async (studentCode) => apiCall(`/students/search/findByCode?code=${studentCode}`);

export const getStudentEnrollment = async (studentId) => apiCall(`/students/${studentId}/enrollments`);

export const createStudent = async (studentData) => apiCall('/api/v2/students/register', 'POST', studentData);
export const updateStudent = async (id, studentData) => apiCall(`/students/${id}`, 'PUT', studentData);
export const deleteStudent = async (id) => apiCall(`/students/${id}`, 'DELETE');
