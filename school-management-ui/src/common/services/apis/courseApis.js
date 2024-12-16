import apiCall from '../apiService';

export const getCourses = async () => {
    const { response, errorMessage } = await apiCall('/courses');
    if (errorMessage) {
        return { response: [], errorMessage };
    }
    return { response: response._embedded.courses, errorMessage };
};
export const getCourseById = (courseId) => apiCall(`/courses/${courseId}`);
export const createCourse = async (courseData) => apiCall('/courses', 'POST', courseData);
export const updateCourse = async (id, courseData) => apiCall(`/api/v2/courses/${id}`, 'PUT', courseData);
export const deleteCourse = async (id) => apiCall(`/courses/${id}`, 'DELETE');

export const generateSessionsForCourse = (courseId, monthsAhead) => apiCall(`/api/v2/courses/${courseId}/sessions/generate?monthsAhead=${monthsAhead}`, 'POST');
