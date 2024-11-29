import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Table, Button, Spin, message } from 'antd';
import { getStudentsWithEnrollmentsByCourseId, removeStudentFromCourse } from '~/common/services/apis/enrollmentApis';

const CourseStudentsMPage = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [removing, setRemoving] = useState({}); // Track removing state for each student

    useEffect(() => {
        fetchStudentsWithEnrollmentsOfCourse();
    }, []);

    const fetchStudentsWithEnrollmentsOfCourse = async () => {
        setLoading(true);
        const { response, errorMessage } = await getStudentsWithEnrollmentsByCourseId(courseId);
        if (errorMessage) {
            message.error(errorMessage || 'Failed to load students.');
        } else {
            setStudents(response || []);
        }
        setLoading(false);
    };

    const handleRemoveStudent = async (studentId) => {
        setRemoving((prev) => ({ ...prev, [studentId]: true })); // Mark as removing
        const { errorMessage } = await removeStudentFromCourse(courseId, studentId);
        if (errorMessage) {
            message.error(`Failed to remove student: ${errorMessage}`);
        } else {
            setStudents((prevStudents) => prevStudents.filter((student) => student.studentId !== studentId));
            message.success('Student removed successfully.');
        }
        setRemoving((prev) => ({ ...prev, [studentId]: false })); // Reset removing state
    };

    const columns = [
        { title: 'ID', dataIndex: 'studentId', key: 'studentId' },
        { title: 'Student Code', dataIndex: 'studentCode', key: 'studentCode' },
        { title: 'First Name', dataIndex: 'firstName', key: 'firstName' },
        { title: 'Last Name', dataIndex: 'lastName', key: 'lastName' },
        { title: 'Gender', dataIndex: 'gender', key: 'gender' },
        { title: 'Age', dataIndex: 'age', key: 'age' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Phone Number', dataIndex: 'phoneNumber', key: 'phoneNumber' },
        { title: 'Address', dataIndex: 'address', key: 'address' },
        { title: 'Enrollment Date', dataIndex: 'enrollmentDate', key: 'enrollmentDate' },
        { title: 'Enrollment Status', dataIndex: 'enrollmentStatus', key: 'enrollmentStatus' },

        {
            title: 'Actions',
            key: 'actions',
            render: (_, student) => (
                <Button
                    type="primary"
                    danger
                    onClick={() => handleRemoveStudent(student.studentId)}
                    disabled={removing[student.studentId]} // Disable button while removing
                >
                    {removing[student.studentId] ? <Spin size="small" /> : 'Remove'}
                </Button>
            ),
        },
    ];

    return (
        <div>
            <h1>Students in Course</h1>
            <Button type="primary" onClick={() => navigate(`/course/${courseId}/student-enroll`)} style={{ marginBottom: '16px' }}>
                Enroll Students
            </Button>
            {loading ? (
                <Spin tip="Loading students..." size="large" />
            ) : students.length === 0 ? (
                <p>No students enrolled in this course.</p>
            ) : (
                <Table columns={columns} dataSource={students} rowKey="id" pagination={{ pageSize: 10 }} />
            )}
        </div>
    );
};

export default CourseStudentsMPage;
