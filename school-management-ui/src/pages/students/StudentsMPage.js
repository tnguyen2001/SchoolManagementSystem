import { Button, Flex, Input, notification } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import urls from '~/common/configs/urls';
import { getStudentByStudentCode, getStudents } from '~/common/services/apis/studentApis';

function StudentsMPage() {
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const searchInputRef = useRef(null);
    const location = useLocation();

    const { lastSearch, formResponse } = location.state || {};

    useEffect(() => {
        console.log('formResponse', formResponse);
        if (formResponse) {
            notification.success({
                message: `${formResponse.action} Successful`,
                description: `Student code ${formResponse.studentCode}`,
            });
        }
    }, [formResponse]);

    useEffect(() => {
        if (lastSearch) {
            setSearch(lastSearch);
            searchInputRef.current?.focus();
        }
        loadStudents();
    }, [lastSearch]);

    const loadStudents = async () => {
        setLoading(true);
        const { response, errorMessage } = await getStudents();
        errorMessage
            ? notification.error({
                  message: 'Error Loading Students',
                  description: errorMessage,
              })
            : setStudents(response.students);
        setLoading(false);
    };

    const handleOnChange = (value) => {
        setSearch(value);
    };

    const navigateToForm = async (type) => {
        let isNavigate = true;
        let studentData = null;
        if (type === 'enquiry' || type === 'edit' || type === 'delete') {
            if (search) {
                studentData = await loadStudentByStudentCode(search);
            } else {
                notification.error({
                    message: 'Student code must be enter',
                });
                isNavigate = false;
            }
        } else if (search) {
            notification.error({
                message: 'Student code cannot be enter',
            });
            isNavigate = false;
        }

        if (isNavigate) {
            let path = getNavigationPath(type, studentData);
            navigate(path, { state: { actionType: type, studentData: studentData, lastSearch: search } });
        }
    };

    const getNavigationPath = (action, student) => {
        switch (action) {
            case 'edit':
            case 'enquiry':
            case 'delete':
                return student ? `${urls.baseStudentForm}/${action}/${student.id}` : `${urls.baseStudentForm}/${action}`;

            case 'create':
            default:
                return `${urls.baseStudentForm}/${action}`;
        }
    };

    const loadStudentByStudentCode = async (studentCode) => {
        setLoading(true);
        const { response, errorMessage } = await getStudentByStudentCode(studentCode);
        setLoading(false);
        if (errorMessage) {
            notification.error({
                message: 'Error Loading Student',
                description: errorMessage,
            });
            return null;
        } else {
            return response;
        }
    };

    return (
        <div>
            <Flex wrap gap="large" className="action">
                <Input placeholder="Student code" onChange={(e) => handleOnChange(e.target.value)} ref={searchInputRef} value={search} style={{ marginBottom: 20, width: '40%' }} />
                <Button onClick={() => navigateToForm('create')}>Create Student</Button>
                <Button onClick={() => navigateToForm('edit')}>Edit</Button>
                <Button onClick={() => navigateToForm('delete')} danger>
                    Delete
                </Button>
                <Button onClick={() => navigateToForm('enquiry')}>Enquiry</Button>
            </Flex>
        </div>
    );
}

export default StudentsMPage;
