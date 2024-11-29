import React, { useEffect, useState } from 'react';
import { Button, Table, message, Spin, Row, Col, Typography, Tooltip, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getCourses } from '~/common/services/apis/courseApis';
import { EditOutlined, DeleteOutlined, FileTextOutlined, PlayCircleOutlined } from '@ant-design/icons';
import urls from '~/common/configs/urls';

const { Title } = Typography;

const CoursesManagement = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCourses();
    }, []); // Only run once on mount

    const fetchCourses = async () => {
        setLoading(true);
        const { response, errorMessage } = await getCourses();
        setLoading(false);
        if (response) {
            setCourses(response);
        } else {
            message.error(errorMessage || 'Failed to load courses.');
        }
    };

    const handleNavigation = (action, course = null) => {
        let path = getNavigationPath(action, course);
        navigate(path, course ? { state: { course } } : undefined);
    };

    const getNavigationPath = (action, course) => {
        switch (action) {
            case 'generate-session':
                return `/courses/${course.id}/generate-session`;
            case 'manage-sessions':
                return `/sessions/${course.id}/manage`;
            case 'edit':
            case 'enquiry':
            case 'delete':
                return course ? `${urls.baseCourseForm}/${action}/${course.id}` : `${urls.baseCourseForm}/${action}`;

            case 'manage-student':
                return `/courses/${course.id}/manage-student`;
            case 'create':
            default:
                return `${urls.baseCourseForm}/${action}`;
        }
    };

    const renderActions = (course) => (
        <Space>
            <Tooltip title="Edit Course">
                <Button icon={<EditOutlined />} onClick={() => handleNavigation('edit', course)} style={{ marginRight: '8px' }} type="default" />
            </Tooltip>
            <Tooltip title="Course Enquiry">
                <Button icon={<FileTextOutlined />} onClick={() => handleNavigation('enquiry', course)} style={{ marginRight: '8px' }} type="default" />
            </Tooltip>
            <Tooltip title="Manage Student">
                <Button icon={<EditOutlined />} onClick={() => handleNavigation('manage-student', course)} style={{ marginRight: '8px' }} type="default" />
            </Tooltip>
            <Tooltip title="Generate Sessions">
                <Button icon={<PlayCircleOutlined />} onClick={() => handleNavigation('generate-session', course)} style={{ marginRight: '8px' }} type="primary" />
            </Tooltip>
            <Tooltip title="Sessions Manage">
                <Button icon={<PlayCircleOutlined />} onClick={() => handleNavigation('manage-sessions', course)} style={{ marginRight: '8px' }} type="primary" />
            </Tooltip>
            <Tooltip title="Delete Course">
                <Button icon={<DeleteOutlined />} onClick={() => handleNavigation('delete', course)} style={{ marginRight: '8px' }} danger />
            </Tooltip>
        </Space>
    );

    const columns = [
        {
            title: 'Course Code',
            dataIndex: 'code',
            width: '20%',
        },
        {
            title: 'Course Name',
            dataIndex: 'name',
            width: '40%',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => renderActions(record),
            width: '30%',
        },
    ];

    return (
        courses && (
            <div style={{ padding: '20px' }}>
                <Row justify="space-between" align="middle" style={{ marginBottom: '20px' }}>
                    <Col>
                        <Title level={2}>Courses Management</Title>
                    </Col>
                    <Col>
                        <Button type="primary" onClick={() => handleNavigation('create')} style={{ marginBottom: '16px' }}>
                            Create New Course
                        </Button>
                    </Col>
                </Row>

                {loading ? <Spin size="large" /> : <Table columns={columns} dataSource={courses} rowKey="id" pagination={{ pageSize: 10 }} locale={{ emptyText: 'No courses available' }} />}
            </div>
        )
    );
};

export default CoursesManagement;
