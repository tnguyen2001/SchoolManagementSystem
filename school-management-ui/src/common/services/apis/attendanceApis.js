import apiCall from '../apiService';

export const updatePatchSession = (sessionId, session) => apiCall(`/class-session/${sessionId}`, 'PATCH', session);

export const markListAttendances = (sessionId, attendancesData) => apiCall(`/api/v2/batch/sessions/${sessionId}/mark-bulk`, 'PUT', attendancesData);
