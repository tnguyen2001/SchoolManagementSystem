import { Button, message, Select, Table, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ATTENDANCE_STATUSES } from '~/common/constants/AttendanceStatus';
import { markListAttendances } from '~/common/services/apis/attendanceApis';
import { getSessionById } from '~/common/services/apis/classSessionApis';
import { getCourseById } from '~/common/services/apis/courseApis';
import { getStudentsByCourseId } from '~/common/services/apis/enrollmentApis';

const { Column } = Table;
const { Option } = Select;
const { Title } = Typography;

const AttendancesMPage = () => {
    const { sessionId, courseId } = useParams(); // Retrieve session ID and course ID from URL
    const [course, setCourse] = useState(null); // Store course information
    const [session, setSession] = useState(null); // Store session information
    const [students, setStudents] = useState([]); // List of enrolled students
    const [attendance, setAttendance] = useState({}); // Tracks attendance for each student
    const [remarks, setRemarks] = useState({}); // Store remarks for each student

    // Fetch course information
    useEffect(() => {
        fetchCourseInfo();
    }, [courseId]);

    const fetchCourseInfo = async () => {
        const { response, errorMessage } = await getCourseById(courseId);
        if (response) {
            setCourse(response);
        } else {
            message.error('Failed to fetch course: ' + errorMessage);
        }
    };

    // Fetch session information
    useEffect(() => {
        fetchSessionInfo();
    }, [sessionId]);

    const fetchSessionInfo = async () => {
        const { response, errorMessage } = await getSessionById(sessionId);
        if (response) {
            setSession(response);
        } else {
            message.error('Failed to fetch session: ' + errorMessage);
        }
    };

    // Fetch the list of students enrolled in the course
    useEffect(() => {
        fetchEnrolledStudents();
    }, [courseId]);

    const fetchEnrolledStudents = async () => {
        const { response, errorMessage } = await getStudentsByCourseId(courseId);
        if (response) {
            setStudents(response);
        } else {
            message.error('Failed to fetch students: ' + errorMessage);
        }
    };

    // Track attendance changes as teacher marks each student
    const handleAttendanceChange = (studentId, status) => {
        setAttendance((prevAttendance) => ({
            ...prevAttendance,
            [studentId]: status,
        }));
    };

    // Track remarks for each student
    const handleRemarksChange = (studentId, remarks) => {
        setRemarks((prevRemarks) => ({
            ...prevRemarks,
            [studentId]: remarks,
        }));
    };

    // Handle the submit action to send attendance data to the backend
    const handleAttendanceSubmit = async () => {
        // Prepare attendance data for all students
        const attendanceData = students.map((student) => ({
            studentId: student.id,
            status: attendance[student.id] || 'PRESENT', // Default to PRESENT if no status is provided
            remarks: remarks[student.id] || '', // Optional remarks
        }));

        // Call API to save the attendance
        const { response, errorMessage } = await markListAttendances(sessionId, attendanceData);

        if (response) {
            message.success('Attendance saved successfully!');
        } else {
            message.error('Failed to save attendance: ' + errorMessage);
        }
    };

    return (
        <div>
            <Title level={2}>
                Mark Attendance for {course ? course.name : 'Course'} - {session ? ` ${session.sessionDate} ` : 'Session'}
            </Title>
            <Table dataSource={students} rowKey="id" pagination={false}>
                <Column title="Student Code" dataIndex="studentCode" key="studentCode" />
                <Column title="First Name" dataIndex="firstName" key="firstName" />
                <Column title="Last Name" dataIndex="lastName" key="lastName" />

                <Column
                    title="Attendance"
                    key="attendance"
                    render={(text, record) => (
                        <Select defaultValue="PRESENT" onChange={(value) => handleAttendanceChange(record.id, value)}>
                            {ATTENDANCE_STATUSES.map((status) => (
                                <Option key={status} value={status}>
                                    {status}
                                </Option>
                            ))}
                        </Select>
                    )}
                />

                <Column
                    title="Remarks"
                    key="remarks"
                    render={(text, record) => <input type="text" value={remarks[record.id] || ''} onChange={(e) => handleRemarksChange(record.id, e.target.value)} placeholder="Add remarks" />}
                />
            </Table>
            <Button type="primary" onClick={handleAttendanceSubmit} style={{ marginTop: '20px' }}>
                Mark Attendances
            </Button>
        </div>
    );
};

export default AttendancesMPage;
