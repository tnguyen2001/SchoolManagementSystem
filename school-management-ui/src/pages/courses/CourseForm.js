import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Input, Button, DatePicker, TimePicker, Select, Checkbox, message, Row, Col, Space, Typography, Spin } from 'antd';
import moment from 'moment';
import { getCourseById, createCourse, updateCourse, deleteCourse } from '~/common/services/apis/courseApis';
import { DayOfWeekEnum } from '~/common/constants/DayOfWeekEnum';
import urls from '~/common/configs/urls';
import { CourseStatus } from '~/common/constants/CourseStatus';
import FormItem from '~/components/FormItem';

const { Option } = Select;
const { Title, Text } = Typography;

const CourseForm = () => {
    const { action, courseId } = useParams();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(false); // Added loading state
    const [disabled, setDisabled] = useState(false); // Added loading state

    useEffect(() => {
        setDisabled(['enquiry', 'delete'].includes(action));
        if (action !== 'create' && courseId) {
            fetchCourse(courseId);
        }
    }, [action, courseId]);

    const fetchCourse = async (id) => {
        setLoading(true);
        const { response, errorMessage } = await getCourseById(id);
        setLoading(false);
        if (response) {
            setCourse(response);
            form.setFieldsValue({
                ...response,
                startDate: moment(response.startDate),
                endDate: response.endDate ? moment(response.endDate) : null,
                startTime: moment(response.startTime, 'HH:mm:ss'),
                endTime: moment(response.endTime, 'HH:mm:ss'),
                daysOfWeek: response.daysOfWeek || [],
            });
        } else {
            message.error(errorMessage || 'Failed to load course.');
        }
    };

    const handleSubmit = async (values) => {
        setLoading(true); // Show loading spinner while submitting
        const formattedValues = formatCourseValues(values);
        let response, errorMessage;

        switch (action) {
            case 'create':
                ({ response, errorMessage } = await createCourse(formattedValues));
                break;
            case 'edit':
                ({ response, errorMessage } = await updateCourse(courseId, formattedValues));
                break;
            case 'delete':
                ({ response, errorMessage } = await deleteCourse(courseId));
                break;
            default:
                break;
        }

        setLoading(false); // Hide loading spinner
        if (response) {
            message.success(`${capitalizeFirstLetter(action)} successful.`);
            navigate(urls.coursesMaintenance);
        } else {
            message.error(errorMessage || 'Action failed.');
        }
    };

    const formatCourseValues = (values) => {
        return {
            ...values,
            startDate: values.startDate.format('YYYY-MM-DD'),
            endDate: values.endDate ? values.endDate.format('YYYY-MM-DD') : null,
            startTime: values.startTime.format('HH:mm:ss'),
            endTime: values.endTime.format('HH:mm:ss'),
        };
    };

    const handleCancel = () => navigate(urls.coursesMaintenance);

    const renderCourseDetails = () => (
        <div>
            <Title level={2}>Course Details (Enquiry Mode)</Title>
            {renderCourseDetailRow('Code', course.code)}
            {renderCourseDetailRow('Name', course.name)}
            {renderCourseDetailRow('Description', course.description)}
            {renderCourseDetailRow('Status', course.status)}
            {renderCourseDetailRow('Start Date', course.startDate)}
            {renderCourseDetailRow('End Date', course.endDate || 'N/A')}
            {renderCourseDetailRow('Start Time', course.startTime)}
            {renderCourseDetailRow('End Time', course.endTime)}
            {renderCourseDetailRow('Days of Week', course.daysOfWeek.join(', '))}
            <Space>
                <Button onClick={handleCancel}>Back to List</Button>
            </Space>
        </div>
    );

    const renderCourseDetailRow = (label, value) => (
        <Row>
            <Col span={6}>
                <Text strong>{label}:</Text>
            </Col>
            <Col span={18}>{value}</Col>
        </Row>
    );

    const daysOfWeekOptions = Object.values(DayOfWeekEnum).map((day) => (
        <Option key={day} value={day}>
            {day}
        </Option>
    ));

    const renderForm = () => (
        <Form form={form} onFinish={handleSubmit}>
            <Row gutter={[16, 16]}>
                <FormItem label="Course Code" name="code" required element={<Input />} />
                <FormItem label="Course Name" name="name" required element={<Input />} />
                <FormItem label="Description" name="description" required element={<Input.TextArea rows={4} />} />
                <FormItem
                    label="Status"
                    name="status"
                    required
                    element={
                        <Select placeholder="Select status">
                            {CourseStatus.map((status) => (
                                <Option key={status} value={status}>
                                    {status}
                                </Option>
                            ))}
                        </Select>
                    }
                />

                <FormItem label="Start Time" name="startTime" required element={<TimePicker format="HH:mm:ss" />} />
                <FormItem label="End Time" name="endTime" required element={<TimePicker format="HH:mm:ss" />} />
                <FormItem
                    label="Days of Week"
                    name="daysOfWeek"
                    required
                    element={
                        <Select mode="multiple" placeholder="Select days of the week">
                            {daysOfWeekOptions}
                        </Select>
                    }
                />
            </Row>
            <Row justify="space-between" gutter={16}>
                {action !== 'enquiry' && (
                    <Col>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            {capitalizeFirstLetter(action)}
                        </Button>
                    </Col>
                )}
                <Col>
                    <Button onClick={handleCancel} style={{ marginLeft: '10px' }}>
                        Cancel
                    </Button>
                </Col>
            </Row>
        </Form>
    );

    const isFormDisabled = () => ['enquiry name = delete'].includes(action);

    const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

    if (action === 'enquiry' && course) {
        return renderCourseDetails();
    }

    return (
        <div>
            <Title level={2}>{action === 'create' ? 'Create Course' : action === 'edit' ? 'Edit Course' : 'Delete Course'}</Title>
            {loading ? <Spin size="large" /> : renderForm()}
        </div>
    );
};

export default CourseForm;
