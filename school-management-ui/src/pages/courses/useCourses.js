import { useState, useEffect } from 'react';
import urls from '~/common/configs/urls';
import { getCourses } from '~/common/services/apis/courseApis';
import apiCall from '~/common/services/apiService';

function useCourses() {
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [filterText, setFilterText] = useState('');

    // Fetch courses on component mount
    useEffect(() => {
        const fetchCourses = async () => {
            const { response, errorMessage } = await getCourses();
            if (errorMessage) {
                console.error('Failed to fetch courses:', errorMessage);
            } else {
                setCourses(response);
                setFilteredCourses(response);
            }
        };

        fetchCourses();
    }, []);

    // Function to handle filtering courses
    const handleFilterChange = (text) => {
        setFilterText(text.toLowerCase());
        const filtered = courses.filter((course) => course.name.toLowerCase().includes(text.toLowerCase()));
        setFilteredCourses(filtered);
    };

    return { courses, filteredCourses, filterText, handleFilterChange };
}

export default useCourses;
