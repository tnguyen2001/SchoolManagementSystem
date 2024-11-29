import React, { useState } from 'react';
import { Input, List, Button, message, Spin, Modal, DatePicker, Select } from 'antd';
import { addStudentToCourse, searchStudentsByPhone, searchStudentsByCode, searchStudentsByFirstName } from '~/common/services/apis/enrollmentApis';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { ENROLLMENT_STATUSES } from '~/common/constants/enrollmentStatuses';

const { Option } = Select;

const CourseStudentEnrollPage = () => {
    const { courseId } = useParams();
    const [phone, setPhone] = useState('');
    const [studentCode, setStudentCode] = useState('');
    const [name, setName] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [status, setStatus] = useState('');
    const [enrollmentDate, setEnrollmentDate] = useState(null);

    const [errors, setErrors] = useState({
        phone: '',
        studentCode: '',
        name: '',
    });

    const validateInputs = () => {
        const filledInputs = [phone, studentCode, name].filter((input) => input.trim() !== '').length;

        if (filledInputs > 1) {
            setErrors({
                phone: phone.trim() !== '' ? 'Please fill only one input field at a time (Phone, Student Code, or Name).' : '',
                studentCode: studentCode.trim() !== '' ? 'Please fill only one input field at a time (Phone, Student Code, or Name).' : '',
                name: name.trim() !== '' ? 'Please fill only one input field at a time (Phone, Student Code, or Name).' : '',
            });
            return false;
        }

        if (filledInputs === 0) {
            setErrors({
                phone: 'Please fill one input field.',
                studentCode: 'Please fill one input field.',
                name: 'Please fill one input field.',
            });
            return false;
        }

        setErrors({ phone: '', studentCode: '', name: '' });
        return true;
    };

    const handleSearch = async () => {
        if (!validateInputs()) return;

        setIsSearching(true);
        let response = null;
        let errorMessage = null;

        if (phone) {
            ({ response, errorMessage } = await searchStudentsByPhone(courseId, phone));
        } else if (studentCode) {
            ({ response, errorMessage } = await searchStudentsByCode(courseId, studentCode));
        } else if (name) {
            ({ response, errorMessage } = await searchStudentsByFirstName(courseId, name));
        }

        if (errorMessage) {
            message.error(`Failed to search students: ${errorMessage}`);
        } else {
            setSearchResults(response || []);
        }

        setIsSearching(false);
    };

    const openEnrollmentModal = (student) => {
        setSelectedStudent(student);
        setIsModalVisible(true);
    };

    const handleEnrollStudent = async () => {
        if (!status || !enrollmentDate) {
            message.error('Please provide both status and enrollment date.');
            return;
        }

        setIsAdding(true);
        const { errorMessage } = await addStudentToCourse(courseId, selectedStudent.id, { status, enrollmentDate: enrollmentDate.format('YYYY-MM-DD') });

        if (errorMessage) {
            message.error(`Failed to add student: ${errorMessage}`);
        } else {
            message.success('Student added successfully.');
            setSearchResults((prevResults) => prevResults.filter((item) => item.id !== selectedStudent.id));
            setIsModalVisible(false);
        }

        setIsAdding(false);
    };

    const closeModal = () => {
        setIsModalVisible(false);
        setStatus('');
        setEnrollmentDate(null);
        setSelectedStudent(null);
    };

    return (
        <div>
            <h1>Enroll Students to Course</h1>
            <div style={{ marginBottom: '16px' }}>
                <Input
                    placeholder="Search by phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{
                        marginBottom: '8px',
                        borderColor: errors.phone ? 'red' : '',
                    }}
                />
                {errors.phone && <span style={{ color: 'red' }}>{errors.phone}</span>}
            </div>
            <div style={{ marginBottom: '16px' }}>
                <Input
                    placeholder="Search by student code"
                    value={studentCode}
                    onChange={(e) => setStudentCode(e.target.value)}
                    style={{
                        marginBottom: '8px',
                        borderColor: errors.studentCode ? 'red' : '',
                    }}
                />
                {errors.studentCode && <span style={{ color: 'red' }}>{errors.studentCode}</span>}
            </div>
            <div style={{ marginBottom: '16px' }}>
                <Input
                    placeholder="Search by name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                        marginBottom: '8px',
                        borderColor: errors.name ? 'red' : '',
                    }}
                />
                {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
            </div>
            <Button type="primary" onClick={handleSearch} disabled={isSearching} loading={isSearching} style={{ marginBottom: '16px' }}>
                Search
            </Button>
            <List
                bordered
                loading={isSearching}
                dataSource={searchResults}
                renderItem={(student) => (
                    <List.Item
                        actions={[
                            <Button type="primary" onClick={() => openEnrollmentModal(student)} disabled={isAdding}>
                                Enroll
                            </Button>,
                        ]}
                    >
                        {`${student.studentCode} - ${student.firstName} ${student.lastName} (${student.phoneNumber})`}
                    </List.Item>
                )}
            />
            <Modal title="Enroll Student" visible={isModalVisible} onOk={handleEnrollStudent} onCancel={closeModal} confirmLoading={isAdding}>
                <div style={{ marginBottom: '16px' }}>
                    <label>Status:</label>
                    <Select value={status} onChange={(value) => setStatus(value)} style={{ width: '100%' }}>
                        {ENROLLMENT_STATUSES.map((status) => (
                            <Option key={status} value={status}>
                                {status}
                            </Option>
                        ))}
                    </Select>
                </div>
                <div>
                    <label>Enrollment Date:</label>
                    <DatePicker value={enrollmentDate} onChange={(date) => setEnrollmentDate(date)} format="YYYY-MM-DD" style={{ width: '100%' }} />
                </div>
            </Modal>
        </div>
    );
};

export default CourseStudentEnrollPage;
