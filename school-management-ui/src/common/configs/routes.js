import Home from '../../pages/Home';
import Register from '../../pages/Register';
import Login from '../../pages/Login';
import Logout from '../../pages/Logout';
import Profile from '../../pages/Profile';
import urls from './urls';
import SpecialLayout from '../../layouts/SpecialLayout';
import Special from '../../pages/Special';
import networkErr from '~/pages/NetworkErr';
import StudentForm from '~/pages/students/StudentForm';
import StudentsMPage from '~/pages/students/StudentsMPage';
import CoursesManagement from '~/pages/courses/CoursesManagement';
import CourseForm from '~/pages/courses/CourseForm';
import GenerateSession from '~/pages/courses/GenerateSession';
import SessionsManagement from '~/pages/sessions/SessionsManagement';
import AttendancesMPage from '~/pages/attendance/AttendancesMPage ';
import CourseStudentsMPage from '~/pages/courses/CourseStudentsMPage';
import CourseStudentEnrollPage from '~/pages/enrollment/CourseStudentEnrollPage';

const publicRoutes = [
    { path: urls.home, component: Home },
    { path: urls.register, component: Register },
    { path: urls.logIn, component: Login },
    { path: urls.logOut, component: Logout },
    { path: urls.profile, component: Profile },
    { path: urls.networkErr, component: networkErr },
    { path: urls.special, component: Special, layout: SpecialLayout },
    { path: urls.studentsManagement, component: StudentsMPage },
    { path: urls.studentForm, component: StudentForm },
    { path: urls.coursesMaintenance, component: CoursesManagement },
    { path: urls.courseForm, component: CourseForm },
    { path: urls.generateSession, component: GenerateSession },
    { path: urls.sessionsManagement, component: SessionsManagement },
    { path: urls.AttendancesMPage, component: AttendancesMPage },
    { path: urls.courseStudentManage, component: CourseStudentsMPage },
    { path: urls.studentEnroll, component: CourseStudentEnrollPage },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
