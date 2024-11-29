// src/components/GenerateSession.js
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Input, message } from 'antd';
import { generateSessionsForCourse } from '~/common/services/apis/courseApis';
import urls from '~/common/configs/urls';

const GenerateSession = () => {
    const location = useLocation(); // To access the state passed from navigate
    const navigate = useNavigate();
    const [course, setCourse] = useState(location.state?.course); // Get course from state
    const [monthsAhead, setMonthsAhead] = useState(0);

    useEffect(() => {
        // If course is not passed in state, navigate back or show an error
        if (!course) {
            message.error('Course details not found.');
            //navigate('/courses'); // Redirect to course list or handle as necessary
        }
    }, [course, navigate]);

    const handleGenerate = async () => {
        const months = course.endDate ? 0 : monthsAhead; // If endDate is present, set monthsAhead to 0

        const { response, errorMessage } = await generateSessionsForCourse(course.id, months);
        if (response) {
            message.success('Sessions generated successfully!');
            navigate(`/sessions/${course.id}/manage`, { state: { course } });
        } else {
            message.error(errorMessage || 'Failed to generate sessions.');
        }
    };

    const handlePrevious = () => {
        navigate(urls.coursesMaintenance);
    };

    const handleCancel = () => {
        navigate(urls.coursesMaintenance);
    };

    if (!course) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>
                Auto Generate Session for Course {course.code} - {course.name}
            </h2>
            <p>Generate from: {course.startDate}</p>
            <p>Generate to: {course.endDate || 'Indefinite'}</p>
            {!course.endDate && <Input type="number" value={monthsAhead} onChange={(e) => setMonthsAhead(Number(e.target.value))} placeholder="Months Ahead" />}

            <Button onClick={handlePrevious} style={{ marginLeft: '8px' }}>
                Previous
            </Button>
            <Button type="primary" onClick={handleGenerate}>
                Generate Sessions
            </Button>
            <Button onClick={handleCancel} style={{ marginLeft: '8px' }}>
                Cancel
            </Button>
        </div>
    );
};

export default GenerateSession;
