import React, { useState } from 'react';
import { Input, List, Button, message, Spin, Modal, DatePicker, Select, InputNumber, Form } from 'antd';
import { addStudentToCourse, searchStudentsByPhone, searchStudentsByCode, searchStudentsByFirstName } from '~/common/services/apis/enrollmentApis';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { EnrollmentStatus } from '~/common/constants/app-enums';
import FormItem from '~/components/FormItem';
import { FREQUENCIES } from '~/common/constants/Frequency';

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

    const [form] = Form.useForm();

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

    const handleEnrollStudent = async (values) => {
        const enrollmentData = {
            ...values,
            enrollmentDate: values.enrollmentDate.format('YYYY-MM-DD'),
        };

        setIsAdding(true);
        const { errorMessage } = await addStudentToCourse(courseId, selectedStudent.id, enrollmentData);

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
        setSelectedStudent(null);
        form.resetFields();
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
            <Modal title="Enroll Student" visible={isModalVisible} onCancel={closeModal} footer={null} confirmLoading={isAdding}>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleEnrollStudent}
                    initialValues={{
                        status: '',
                        enrollmentDate: null,
                    }}
                >
                    <FormItem
                        label="Status"
                        name="status"
                        rules={[{ required: true }]}
                        element={
                            <Select placeholder="Select status">
                                {Object.entries(EnrollmentStatus).map(([key, value]) => (
                                    <Option key={key} value={key}>
                                        {value}
                                    </Option>
                                ))}
                            </Select>
                        }
                    />
                    <FormItem label="Enrollment Date" name="enrollmentDate" rules={[{ required: true }]} element={<DatePicker format="YYYY-MM-DD" />} />
                    <FormItem label="Start Date" name="startDate" rules={[{ required: true }]} element={<DatePicker format="YYYY-MM-DD" />} />
                    <FormItem label="End Date" name="endDate" element={<DatePicker format="YYYY-MM-DD" />} />
                    <FormItem
                        label="Frequency"
                        name="frequency"
                        rules={[{ required: true }]}
                        element={
                            <Select placeholder="Select frequency">
                                {FREQUENCIES.map((frequency) => (
                                    <Option key={frequency} value={frequency}>
                                        {frequency}
                                    </Option>
                                ))}
                            </Select>
                        }
                    />
                    <FormItem label="Total Learning Days" name="totalLearningDays" rules={[{ type: 'number', min: 0, max: 99 }]} element={<InputNumber value={11} />} />

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={isAdding}>
                            Enroll
                        </Button>
                    </Form.Item>

                    <Form.Item>
                        <Button onClick={closeModal} loading={isAdding}>
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default CourseStudentEnrollPage;
