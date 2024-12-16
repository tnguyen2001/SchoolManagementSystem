import { Button, DatePicker, Form, Input, InputNumber, Row, Select, Col, Space } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { layout, prefixSelector, validateMessages } from '~/common/configs/antd';
import urls from '~/common/configs/urls';
import { createStudent, deleteStudent, updateStudent } from '~/common/services/apis/studentApis';
import useCourses from '../courses/useCourses';
import FormItem from '~/components/FormItem';
import SelectOption from '~/components/SelectOption';
import { courseStatus } from '~/common/constants/options/CourseStatus';
import { GenderOptions } from '~/common/constants/options/GenderOptions';

function StudentForm({ initialValues, onSubmit, onCancel }) {
    const { action, studentId } = useParams();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const [disabled, setDisabled] = useState(false);

    const { actionType, studentData, lastSearch } = location.state || {};
    const { filteredCourses, filterText, handleFilterChange } = useCourses();

    useEffect(() => {
        setDisabled(actionType === 'enquiry' || actionType === 'delete');
    }, [actionType]);

    useEffect(() => {
        if (studentData) {
            form.setFieldsValue(studentData);
        } else {
            form.resetFields();
        }
    }, [studentData, form]);

    const handleSubmit = async () => {
        const values = await form.validateFields();
        let errorMessage, response;

        if (actionType === 'create') {
            ({ response, errorMessage } = await createStudent(values));
        } else if (actionType === 'edit') {
            ({ response, errorMessage } = await updateStudent(studentData.id, values));
        } else if (actionType === 'delete') {
            ({ response, errorMessage } = await deleteStudent(studentData.id));
        }

        if (errorMessage) {
            alert(errorMessage);
        } else {
            navigate(urls.studentsManagement, { state: { lastSearch, formResponse: { ...response, action: actionType } } });
        }
    };

    const handleCancel = () => {
        navigate(urls.studentsManagement, { state: { lastSearch } });
    };

    const handlePrevious = () => {
        navigate(urls.studentsManagement, { state: { lastSearch } });
    };

    return (
        <>
            <h1 style={{ fontWeight: 'bold', color: '#4A90E2', marginBottom: 20 }}> {`${action?.charAt(0).toUpperCase() + action?.slice(1)} Student`}</h1>

            <Form
                form={form}
                {...layout}
                name="student-form"
                onFinish={handleSubmit}
                validateMessages={validateMessages}
                style={{ maxWidth: 800, margin: '0 auto', background: '#f9f9f9', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
            >
                <Row gutter={[24, 24]}>
                    {/* Personal Information Section */}
                    <h3 style={{ width: '100%', fontWeight: 'bold', fontSize: 18, marginBottom: '16px' }}>Personal Information</h3>
                    <FormItem label="Student Code" name="studentCode" rules={[{ required: true }]} disabled={disabled} element={<Input />} />
                    <FormItem label="First Name" name="firstName" rules={[{ required: true }]} disabled={disabled} element={<Input />} />
                    <FormItem label="Last Name" name="lastName" rules={[{ required: true }]} disabled={disabled} element={<Input />} />
                    <FormItem label="Gender" name="gender" rules={[{ required: true }]} element={<SelectOption options={GenderOptions} />} />
                    <FormItem label="Age" name="age" rules={[{ required: true, type: 'number', min: 0, max: 99 }]} disabled={disabled} element={<InputNumber />} />
                    <FormItem label="Email" name="email" rules={[{ required: true, type: 'email' }]} disabled={disabled} element={<Input />} />
                    <FormItem
                        label="Phone Number"
                        name="phoneNumber"
                        rules={[{ required: true, message: 'Please input your phone number!' }]}
                        disabled={disabled}
                        element={<Input addonBefore={prefixSelector} />}
                    />
                    <FormItem label="Address" name="address" rules={[{ required: true }]} disabled={disabled} element={<Input />} />

                    {/* User Information Section */}
                    <h3 style={{ width: '100%', fontWeight: 'bold', fontSize: 18, marginBottom: '16px' }}>User Information</h3>
                    <FormItem label="User name" name="username" rules={[{ required: false }]} disabled={disabled} element={<Input />} />
                    <FormItem label="Password" name="password" rules={[{ required: false, type: 'password' }]} disabled={disabled} element={<Input />} />
                    <FormItem label="Confirm Password" name="confirmPassword" rules={[{ required: false, type: 'password' }]} disabled={disabled} element={<Input />} />

                    {/* Course Information Section */}
                    {!studentData && (
                        <>
                            <h3 style={{ width: '100%', fontWeight: 'bold', fontSize: 18, marginBottom: '16px' }}>Course Information</h3>
                            <FormItem
                                label="Search Course"
                                name="searchCourse"
                                element={<Input placeholder="Input course" value={filterText} onChange={(e) => handleFilterChange(e.target.value)} disabled={disabled} />}
                            />
                            <FormItem
                                label="Course"
                                name="courseID"
                                element={
                                    <Select placeholder="Select a course" allowClear disabled={disabled} style={{ width: '100%' }}>
                                        {filteredCourses.map((course) => (
                                            <Select.Option key={course.id} value={course.id}>
                                                {course.name}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                }
                            />
                            <FormItem
                                label="Enrollment Date"
                                name="enrollmentDate"
                                rules={[{ type: 'object', required: false, message: 'Please select time!' }]}
                                element={<DatePicker format="YYYY-MM-DD" disabled={disabled} style={{ width: '100%' }} />}
                            />
                            <FormItem label="Status" name="status" rules={[{ required: false }]} element={<SelectOption options={courseStatus} />} disabled={disabled} />
                        </>
                    )}
                    {/* Buttons Section */}
                    <Form.Item style={{ width: '100%' }}>
                        <Space>
                            <Button onClick={handlePrevious} style={{ borderRadius: '4px' }}>
                                Previous
                            </Button>
                            {actionType !== 'enquiry' && (
                                <>
                                    <Button type="primary" htmlType="submit" style={{ borderRadius: '4px' }}>
                                        Submit
                                    </Button>
                                    <Button htmlType="button" onClick={() => form.resetFields()} style={{ borderRadius: '4px' }}>
                                        Reset
                                    </Button>
                                </>
                            )}
                            <Button onClick={handleCancel} style={{ marginLeft: 8, borderRadius: '4px', backgroundColor: '#f5f5f5' }}>
                                Cancel
                            </Button>
                        </Space>
                    </Form.Item>
                </Row>
            </Form>
        </>
    );
}

export default StudentForm;
