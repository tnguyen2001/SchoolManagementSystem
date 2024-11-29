import apiCall from '../apiService';

export const getSessionsByCourseId = async (courseId) => {
    const { response, errorMessage } = await apiCall(`/courses/${courseId}/classSessions`, 'GET');
    return { response: response._embedded.classSessions, errorMessage };
};

export const getSessionById = (sessionId) => apiCall(`/class-session/${sessionId}`);

export const updateSessionStatus = (sessionId, newStatus) => apiCall(`/api/class-sessions/${sessionId}/status?status=${newStatus}`, 'PATCH');

export const updatePatchSession = (sessionId, session) => apiCall(`/class-session/${sessionId}`, 'PATCH', session);

export const addManualSession = (courseId, session) => apiCall(`/api/class-sessions/courses/${courseId}/add-session`, 'POST', session);
