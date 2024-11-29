import apiCall from '../apiService';

export const getEnrollments = async () => apiCall('/enrollments');
export const createEnrollment = async (enrollmentData) => apiCall('/enrollments', 'POST', enrollmentData);
export const updateEnrollment = async (id, enrollmentData) => apiCall(`/enrollments/${id}`, 'PUT', enrollmentData);
export const deleteEnrollment = async (id) => apiCall(`/enrollments/${id}`, 'DELETE');

export const getStudentsByCourseId = async (courseId) => apiCall(`/api/v2/enrollments/courses/${courseId}/students`);

export const getStudentsWithEnrollmentsByCourseId = async (courseId) => apiCall(`/api/v2/enrollments/courses/${courseId}/studentsWithEnrollments`);

export const removeStudentFromCourse = async (courseId, studentId) => apiCall(`/api/v2/enrollments/courses/${courseId}/students/${studentId}`, 'DELETE');

export const searchStudentsByCode = async (courseId, studentCode) => {
    const { response, errorMessage } = await apiCall(`/api/v2/courses/${courseId}/students/searchByStudentCodeNotEnrolled?studentCode=${studentCode}`);
    if (errorMessage) {
        return { response: [], errorMessage };
    }
    return { response, errorMessage };
};
export const searchStudentsByPhone = async (courseId, phone) => {
    const { response, errorMessage } = await apiCall(`/api/v2/courses/${courseId}/students/searchByPhoneNotEnrolled?phone=${phone}`);
    if (errorMessage) {
        return { response: [], errorMessage };
    }
    return { response, errorMessage };
};
export const searchStudentsByFirstName = async (courseId, firstName) => {
    const { response, errorMessage } = await apiCall(`/api/v2/courses/${courseId}/students/searchByFirstNameNotEnrolled?firstName=${firstName}`);
    if (errorMessage) {
        return { response: [], errorMessage };
    }
    return { response, errorMessage };
};
export const addStudentToCourse = async (courseId, studentId, { status, enrollmentDate }) =>
    apiCall(`/api/v2/enrollments/courses/${courseId}/students/${studentId}/enroll`, 'POST', { status, enrollmentDate });
