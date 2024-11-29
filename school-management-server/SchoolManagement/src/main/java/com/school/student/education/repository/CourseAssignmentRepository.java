package com.school.student.education.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.school.student.education.entity.CourseAssignment;

@RepositoryRestResource(path = "course_assignments")
public interface CourseAssignmentRepository extends JpaRepository<CourseAssignment, Long> {
}
