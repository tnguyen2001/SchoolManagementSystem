export const baseURL = 'http://localhost:8083';

const urls = {
    home: '/',
    register: '/auth/register',
    logIn: '/auth/login',
    logOut: '/auth/logout',
    profile: '/profile',
    signOut: '/sign-out',
    stats: '/stats',
    special: '/special',
    networkErr: '/network-error',
    studentsManagement: '/students-maintenance',
    studentForm: '/students/form/:action/:studentId?',
    baseStudentForm: '/students/form',

    getCourses: '/courses',

    coursesMaintenance: '/courses-maintenance',
    courseForm: '/courses/form/:action/:courseId?',
    baseCourseForm: '/courses/form',
    generateSession: 'courses/:courseId?/generate-session',
    courseStudentManage: '/courses/:courseId?/manage-student',
    addStudentsToCourse: '/courses/:courseId?/add-student',
    sessionsManagement: 'sessions/:courseId?/manage',
    AttendancesMPage: '/courses/:courseId/sessions/:sessionId/attendances',
    studentEnroll: '/course/:courseId/student-enroll',
};

export default urls;
